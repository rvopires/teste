/**
 * Gera os áudios da narração — rode no terminal, NÃO no navegador.
 *
 * COMO USAR — no PowerShell, dentro da pasta do projeto:
 *
 *      $env:TTS_USER = "seu-usuario"
 *      $env:TTS_PASS = "sua-senha"
 *      node generate-audios.js
 *
 * O script faz login em /api/auth/login, pega o Bearer token e gera os mp3
 * em assets/audio/. Se você já tiver um token pronto, pode pular o login:
 *
 *      $env:TTS_TOKEN = "cole-o-token-aqui"
 *      node generate-audios.js
 *
 * As credenciais ficam só na sua máquina, nunca no código nem no site.
 *
 * NÃO REGERA à toa: pula o que já existe com o mesmo texto. Se o texto da
 * tela mudar, ele percebe pelo manifest e refaz só aquele áudio. Para forçar
 * tudo de novo:
 *
 *      node generate-audios.js --force
 *
 * Para gerar só algumas telas:
 *
 *      node generate-audios.js home m1-cover
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const T = require('./narration-text.js');

const API_BASE = 'https://texttospeech.escolatecnocursos.cloud';
const TTS_PATH = '/api/tts';
const AUTH_PATH = '/api/auth/login';

const AUDIO_DIR = path.join(__dirname, 'assets', 'audio');
const MANIFEST_FILE = path.join(AUDIO_DIR, 'manifest.json');
const DATA_FILE = path.join(__dirname, 'question-screen-data.js');

// telas geradas por padrão; null = o curso inteiro
const DEFAULT_PAGES = null;

/* ── Carrega o conteúdo do curso ─────────────────────────────────────── */

// o arquivo de dados escreve em `window`, que não existe no Node
function loadSession() {
  const src = fs.readFileSync(DATA_FILE, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox, { filename: 'question-screen-data.js' });
  const session = sandbox.window.QUESTION_SCREEN_SESSION;
  if (!session) throw new Error('não encontrei QUESTION_SCREEN_SESSION em question-screen-data.js');
  return session;
}

// { chave -> texto } de todas as telas narráveis
function buildTexts(session) {
  const catalog = T.buildCatalog(session);
  const texts = new Map();

  texts.set(T.HOME_KEY, T.buildHomeText());

  // menu: uma gravação por módulo liberado, mais a de treinamento concluído
  const mods = session.modules || [];
  for (const m of mods) texts.set(T.menuAudioKey(m.id), T.buildMenuText(session, m.id));
  texts.set(T.menuAudioKey(0), T.buildMenuText(session, 0));

  for (const item of catalog) {
    const id = item.screen && item.screen.id;
    if (!id) continue;
    const text = T.buildScreenText(item.screen);
    if (text) texts.set(id, text);
  }
  return texts;
}

/* ── Manifest ────────────────────────────────────────────────────────── */

// guarda o texto usado em cada áudio, para saber quando o conteúdo mudou
function loadManifest() {
  try {
    const data = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8'));
    return data && typeof data.items === 'object' ? data.items : {};
  } catch (err) {
    return {};
  }
}

function saveManifest(items) {
  const data = { generatedAt: new Date().toISOString(), items };
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(data, null, 2) + '\n');
}

/* ── API ─────────────────────────────────────────────────────────────── */

// troca usuário/senha por um Bearer token
async function login(username, password) {
  const res = await fetch(API_BASE + AUTH_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error(`login falhou: HTTP ${res.status}`);
  const data = await res.json();
  const token = data && (data.token || data.accessToken);
  if (!token) throw new Error('login não devolveu token');
  return token;
}

// o endpoint pode devolver o mp3 direto ou um JSON com url/base64
async function fetchAudio(text, token) {
  const res = await fetch(API_BASE + TTS_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ text })
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}${detail ? ' — ' + detail.slice(0, 200) : ''}`);
  }

  const type = (res.headers.get('content-type') || '').toLowerCase();
  if (!type.includes('application/json')) {
    return Buffer.from(await res.arrayBuffer());
  }

  const data = await res.json();
  const src = data && (data.url || data.audioUrl || data.audio_url || data.audio || data.data);
  if (!src) throw new Error('resposta JSON sem áudio');

  if (/^https?:/i.test(src)) {
    const file = await fetch(src);
    if (!file.ok) throw new Error(`falha ao baixar o áudio: HTTP ${file.status}`);
    return Buffer.from(await file.arrayBuffer());
  }
  const base64 = String(src).replace(/^data:[^,]+,/, '');
  return Buffer.from(base64, 'base64');
}

/* ── Execução ────────────────────────────────────────────────────────── */

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const only = args.filter((a) => !a.startsWith('--'));

  let token = process.env.TTS_TOKEN || '';
  const user = process.env.TTS_USER;
  const pass = process.env.TTS_PASS;

  if (!token && !(user && pass)) {
    console.error(
      'Faltam as credenciais. No PowerShell:\n' +
      '  $env:TTS_USER = "seu-usuario"\n' +
      '  $env:TTS_PASS = "sua-senha"\n' +
      '  node generate-audios.js\n\n' +
      'Ou, se já tiver um token pronto:\n' +
      '  $env:TTS_TOKEN = "seu-token"'
    );
    process.exit(1);
  }

  const texts = buildTexts(loadSession());
  const wanted = only.length ? only : (DEFAULT_PAGES || [...texts.keys()]);

  fs.mkdirSync(AUDIO_DIR, { recursive: true });
  const manifest = loadManifest();

  // decide o que realmente precisa ser gerado, antes de gastar login
  const todo = [];
  let skipped = 0;
  let failed = 0;

  for (const key of wanted) {
    const text = texts.get(key);
    if (!text) {
      console.warn(`· ${key}: sem texto para narrar — pulando`);
      failed++;
      continue;
    }
    const fileName = T.audioFileName(key);
    const file = path.join(AUDIO_DIR, fileName);
    const known = manifest[key];
    const upToDate = fs.existsSync(file) && known && known.text === text;

    if (upToDate && !force) {
      console.log(`· ${key}: já existe e o texto não mudou, pulando`);
      skipped++;
      continue;
    }
    if (known && known.text !== text) {
      console.log(`· ${key}: o texto mudou, vai regerar`);
    }
    todo.push({ key, text, file, fileName });
  }

  if (!todo.length) {
    console.log(`\nNada a fazer. Pulados: ${skipped} · Falhas: ${failed}`);
    return;
  }

  if (!token) {
    process.stdout.write('· fazendo login... ');
    token = await login(user, pass);
    console.log('ok');
  }

  let created = 0;
  for (const item of todo) {
    try {
      process.stdout.write(`· ${item.key}: gerando... `);
      const buffer = await fetchAudio(item.text, token);
      fs.writeFileSync(item.file, buffer);
      manifest[item.key] = { file: 'assets/audio/' + item.fileName, text: item.text };
      console.log(`ok (${(buffer.length / 1024).toFixed(0)} KB)`);
      created++;
    } catch (err) {
      console.log('falhou');
      console.error(`  ${err.message}`);
      failed++;
    }
  }

  saveManifest(manifest);

  console.log(`\nGerados: ${created} · Pulados: ${skipped} · Falhas: ${failed}`);
  console.log(`Pasta: ${path.relative(process.cwd(), AUDIO_DIR)}`);
  if (failed) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
