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

  /* Abreviação depois de número vira palavra: soletrada, a voz lê "vinte esse"
     no lugar de "vinte segundos". Singular quando o número é 1. */
  var UNITS = {
    s: ['segundo', 'segundos'], seg: ['segundo', 'segundos'],
    min: ['minuto', 'minutos'], h: ['hora', 'horas'],
    kg: ['quilo', 'quilos'], g: ['grama', 'gramas'],
    cm: ['centímetro', 'centímetros'], mm: ['milímetro', 'milímetros']
  };
  function spellUnits(text) {
    return text.replace(/(\d+(?:[.,]\d+)?)\s*(seg|min|kg|cm|mm|s|h|g)\b/gi,
      function (all, num, unit) {
        var word = UNITS[unit.toLowerCase()];
        return word ? (num + ' ' + word[num === '1' ? 0 : 1]) : all;
      });
  }

  // tira emoji/símbolo decorativo, vira travessão em pausa e junta espaços
  function clean(value) {
    return spellUnits(String(value == null ? '' : value)
      .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{20E3}]/gu, ' ')
      .replace(/(\d)\s*×/g, '$1 vezes')          // "3× cada"
      .replace(/(\S)\s*×\s*(\S)/g, '$1 ou $2')   // "certo × errado"
      .replace(/[•·▶✓✕×|]/g, ' ')
      .replace(/\s*—\s*/g, ', ')
      .replace(/\s+/g, ' ')
      .trim());
  }

  // numeração global das telas, na mesma ordem que o curso mostra;
  // abertura e menu ocupam as páginas 1 e 2, como no sessao-aprender.html
  function buildCatalog(session) {
    var out = [
      { n: 1, view: 'home', mi: -1, si: -1, screen: null },
      { n: 2, view: 'menu', mi: -1, si: -1, screen: null }
    ];
    ((session && session.modules) || []).forEach(function (m, mi) {
      (m.screens || []).forEach(function (s, si) {
        out.push({ n: out.length + 1, view: 'play', mi: mi, si: si, screen: s });
      });
    });
    return out;
  }

  function joinParts(parts) {
    return parts.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
  }

  function list(value) {
    return Array.isArray(value) ? value : [];
  }

  // ponto final garantido: é o que faz a voz pausar entre um item e outro
  function sentence(value) {
    var t = clean(stripHtml(value));
    if (!t) return '';
    return /[.!?]$/.test(t) ? t : t + '.';
  }

  // "Título: texto", sem repetir dois-pontos que já venham no título
  function labelled(label, text) {
    var l = clean(label).replace(/:\s*$/, '');
    var t = sentence(text);
    if (!t) return l ? l + '.' : '';
    return (l ? l + ': ' : '') + t;
  }

  /* Blocos de conteúdo na mesma ordem em que o contentBlocks() os desenha:
     corpo, números, cards, itens, comparação, tópicos, regras, citação, nota. */
  function contentParts(screen) {
    var parts = [];

    if (screen.body) parts.push(sentence(screen.body));

    list(screen.stats).forEach(function (s) {
      parts.push(sentence(joinParts([clean(s.num), clean(s.label)])));
    });
    list(screen.cards).forEach(function (c) {
      parts.push(labelled(c.title, c.body));
    });
    list(screen.items).forEach(function (it) {
      parts.push(labelled(it.title, it.text || it.body));
    });
    list(screen.compare).forEach(function (c) {
      parts.push(labelled(c.label, c.text || c.body));
    });
    list(screen.bullets).forEach(function (b) {
      parts.push(sentence(b));
    });
    list(screen.rules).forEach(function (r) {
      parts.push(sentence(r.text || r.body));
    });

    if (screen.quote) parts.push(sentence(screen.quote));

    if (screen.note) {
      parts.push(typeof screen.note === 'object'
        ? labelled(screen.note.label, screen.note.text || screen.note.body)
        : sentence(screen.note));
    }

    return parts;
  }

  // a tela do desafio monta essa frase sozinha quando não tem texto próprio
  function quizIntroText(screen) {
    if (screen.body) return clean(stripHtml(screen.body));
    var count = Number(screen.count) || 0;
    if (!count) return '';
    var min = Number(screen.minCorrect) || 0;
    var out = 'Responda ' + count + ' perguntas de múltipla escolha.';
    if (min) out += ' Você precisa acertar no mínimo ' + min + ' para avançar.';
    return out + ' Cada acerto vale 50 pontos.';
  }

  function buildScreenText(screen) {
    if (!screen) return '';
    var parts = [];

    // vídeo: só anuncia o que vem. O conteúdo quem narra é o próprio vídeo.
    if (screen.type === 'video') {
      parts.push((clean(screen.kicker) || 'Vídeo') + '.');
      if (screen.title) parts.push(clean(screen.title) + '.');
      return joinParts(parts);
    }

    /* Pergunta: enunciado e opções na mesma ordem da tela. A explicação fica
       de fora — ela só aparece depois de responder e entregaria a resposta. */
    if (screen.type === 'question') {
      if (screen.question) parts.push(clean(screen.question));
      list(screen.alternatives).slice(0, 4).forEach(function (a, i) {
        if (a && a.text) parts.push('Opção ' + (i + 1) + ': ' + clean(a.text) + '.');
      });
      return joinParts(parts);
    }

    /* Ordenar e associar embaralham os itens a cada exibição, e os dados
       guardam a resposta certa: aqui vai só o enunciado. */
    if (screen.type === 'order' || screen.type === 'match') {
      if (screen.title) parts.push(clean(screen.title) + '.');
      if (screen.body) parts.push(clean(stripHtml(screen.body)));
      return joinParts(parts);
    }

    if (screen.type === 'quiz-intro') {
      if (screen.title) parts.push(clean(screen.title) + '.');
      parts.push(quizIntroText(screen));
      return joinParts(parts);
    }

    // capa, conteúdo, imagem, reflexão e conclusão
    if (screen.eyebrow) parts.push(clean(screen.eyebrow) + '.');
    if (screen.title) parts.push(clean(screen.title) + '.');
    if (screen.subtitle) parts.push(clean(screen.subtitle));

    // na tela de reflexão a pergunta vem quebrada em duas linhas
    var prompt = [screen.prompt, screen.promptAccent]
      .filter(Boolean).map(clean).join(' ').trim();
    if (prompt) parts.push(prompt);

    // a resposta da reflexão entra sempre: é uma gravação só, com tudo
    if (screen.answer) parts.push(clean(stripHtml(screen.answer)));

    parts = parts.concat(contentParts(screen));

    if (screen.imageAlt) parts.push('Na imagem: ' + clean(screen.imageAlt) + '.');
    return joinParts(parts);
  }

  function buildHomeText() {
    return HOME_TEXT;
  }

  // o menu tem uma gravação por situação: qual módulo está liberado agora.
  // 0 significa que todos já foram concluídos.
  function menuAudioKey(nextModule) {
    return 'menu-' + (nextModule ? nextModule : 'done');
  }

  function buildMenuText(session, nextModule) {
    var mods = (session && session.modules) || [];
    var parts = [
      'NR 17, Trilha da Ergonomia.',
      'Conteúdo programático do treinamento.',
      'As atividades ficam só no final de cada módulo.'
    ];
    mods.forEach(function (m) {
      parts.push('Módulo ' + m.id + ', ' + clean(m.title) + '.');
    });
    parts.push(nextModule
      ? ('Módulo ' + nextModule + ' de ' + mods.length + ' liberado.')
      : 'Treinamento concluído. Você finalizou todos os módulos.');
    return parts.join(' ').replace(/\s+/g, ' ').trim();
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
    buildScreenText: buildScreenText,
    buildHomeText: buildHomeText,
    menuAudioKey: menuAudioKey,
    buildMenuText: buildMenuText,
    audioFileName: audioFileName
  };
});
