/**
 * Texto da narração — usado nos dois lados:
 *  - no navegador, para saber qual áudio tocar
 *  - no generate-audios.js, para gerar esse mesmo áudio
 *
 * Como o texto sai daqui nos dois casos, o arquivo gravado em disco é sempre
 * o que a tela espera ouvir. Se mudar o conteúdo, apague o mp3 e gere de novo.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.NarrationText = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  // Abertura: o conteúdo é HTML fixo, então o texto mora aqui.
  // "100%" vira extenso para a voz não ler "por cento" errado.
  var HOME_TEXT = [
    'Abertura do treinamento.',
    'NR 17, Ergonomia no Comércio e na Logística.',
    'Aprenda a identificar riscos e aplicar, na prática, a postura correta',
    'em cada função do dia a dia da loja.',
    'São cinco módulos, com conteúdo completo, em treinamento cem por cento online.'
  ].join(' ');

  function stripHtml(value) {
    return String(value == null ? '' : value)
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, 'e')
      .replace(/&[a-z]+;/gi, ' ');
  }

  // tira emoji/símbolo decorativo, vira travessão em pausa e junta espaços
  function clean(value) {
    return String(value == null ? '' : value)
      .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{20E3}]/gu, ' ')
      .replace(/[•·▶✓✕×|]/g, ' ')
      .replace(/\s*—\s*/g, ', ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // numeração global das telas, na mesma ordem que o curso mostra
  function buildCatalog(session) {
    var out = [];
    ((session && session.modules) || []).forEach(function (m, mi) {
      (m.screens || []).forEach(function (s, si) {
        out.push({ n: out.length + 1, mi: mi, si: si, screen: s });
      });
    });
    return out;
  }

  function pageLabel(page, total) {
    if (!page) return '';
    return total ? ('Página ' + page + ' de ' + total + '.') : ('Página ' + page + '.');
  }

  // ordem: numeração, título, subtítulo, corpo, descrição da imagem
  function buildScreenText(screen, page, total) {
    if (!screen) return '';
    var parts = [];
    var label = pageLabel(page, total);
    if (label) parts.push(label);
    if (screen.title) parts.push(clean(screen.title) + '.');
    if (screen.subtitle) parts.push(clean(screen.subtitle));
    if (screen.body) parts.push(clean(stripHtml(screen.body)));
    if (screen.imageAlt) parts.push('Na imagem: ' + clean(screen.imageAlt) + '.');
    return parts.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
  }

  function buildHomeText() {
    return HOME_TEXT;
  }

  // nome do arquivo de áudio de cada tela
  function audioFileName(key) {
    return String(key).replace(/[^a-z0-9_-]+/gi, '-').toLowerCase() + '.mp3';
  }

  return {
    HOME_KEY: 'home',
    stripHtml: stripHtml,
    clean: clean,
    buildCatalog: buildCatalog,
    pageLabel: pageLabel,
    buildScreenText: buildScreenText,
    buildHomeText: buildHomeText,
    audioFileName: audioFileName
  };
});
