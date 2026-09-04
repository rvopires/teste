/**
 * QuestionScreen — componente reutilizável (vanilla JS)
 *
 * Tipos (JSON) — tudo DENTRO do cartão:
 *  - cover:    { type, title, subtitle?, image? }
 *  - content:  { type, kicker?, title, body?, bullets?, image?, cards?, stats?, items?, rules?, quote?, note?, compare? }
 *  - video:    { type, title, kicker?, duration?, scene?, brief?, video?, youtube?, image?/poster? }
 *  - image:    { type, title, kicker?, body?, bullets?, image, imageFit? }
 *  - quiz-intro: { type, title, body?, count?, minCorrect?, image? }
 *  - quiz-result: { type, passed, score, total, minCorrect, title?, titleUnlock? }
 *  - finale:   { type, title?, body?, eyebrow?, chips?, image?, kicker? }
 *  - reflect:  { type, prompt, answer, choices?[{icon,text}] }
 *  - compare:  { type, compare:[{ok,label,text}] }
 *  - order:    { type, items:[{key,text,rank}], time? }
 *  - match:    { type, pairs:[{ex,body}] }
 *  - question: { type, question, alternatives[2..4], explanation?, image?, opinion? }
 *
 * video: se tiver `video` (mp4) ou `youtube` (id/url), toca o player;
 *        senão mostra o placeholder "Vídeo a gravar" (como no treinamento).
 */
(function (global) {
  'use strict';

  var sfxCtx = null;
  function ensureSfx() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!sfxCtx) sfxCtx = new AC();
    if (sfxCtx.state === 'suspended') {
      try { sfxCtx.resume(); } catch (e) {}
    }
    return sfxCtx;
  }

  var quizCorrectAudio = null;
  var quizWrongAudio = null;
  var QUIZ_CORRECT_SFX = encodeURI('assets/efeitos sonoros/correct-answer.mp3');
  var QUIZ_WRONG_SFX = encodeURI('assets/efeitos sonoros/OBJMisc-wrong_answer-Elevenlabs.mp3');

  function playQuizMp3(kind) {
    var isOk = kind === 'ok' || kind === 'correct';
    var src = isOk ? QUIZ_CORRECT_SFX : QUIZ_WRONG_SFX;
    try {
      ensureSfx();
      var audio = isOk ? quizCorrectAudio : quizWrongAudio;
      if (!audio) {
        audio = new Audio(src);
        audio.preload = 'auto';
        audio.volume = 0.45;
        if (isOk) quizCorrectAudio = audio;
        else quizWrongAudio = audio;
      }
      try {
        if (quizCorrectAudio && quizCorrectAudio !== audio) {
          quizCorrectAudio.pause();
          quizCorrectAudio.currentTime = 0;
        }
        if (quizWrongAudio && quizWrongAudio !== audio) {
          quizWrongAudio.pause();
          quizWrongAudio.currentTime = 0;
        }
      } catch (e) {}
      try {
        if (audio.readyState >= 1) audio.currentTime = 0;
      } catch (e2) {
        try { audio.load(); } catch (e3) {}
      }
      var p = audio.play();
      if (p && typeof p.then === 'function') {
        p.catch(function () { playBeepSynth(isOk ? 'ok' : 'nok'); });
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  function playBeepSynth(type) {
    var ctx = ensureSfx();
    if (!ctx) return;
    try {
      var now = ctx.currentTime;
      function beepNote(freq, t, dur, vol, wave, slideTo) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = wave || 'sine';
        osc.frequency.setValueAtTime(freq, now + t);
        if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(40, slideTo), now + t + dur);
        gain.gain.setValueAtTime(0.0001, now + t);
        gain.gain.exponentialRampToValueAtTime(vol, now + t + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + t + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + dur + 0.02);
      }
      if (type === 'click' || type === 'flip') {
        beepNote(type === 'flip' ? 520 : 880, 0, 0.07, 0.08, 'sine', type === 'flip' ? 680 : 1240);
      } else if (type === 'ok' || type === 'correct') {
        beepNote(523.25, 0, 0.12, 0.16, 'sine');
        beepNote(659.25, 0.08, 0.12, 0.16, 'sine');
        beepNote(783.99, 0.16, 0.22, 0.16, 'sine');
      } else if (type === 'nok') {
        beepNote(320, 0, 0.28, 0.16, 'triangle', 140);
      } else if (type === 'end') {
        beepNote(523.25, 0, 0.16, 0.18, 'triangle');
        beepNote(659.25, 0.1, 0.16, 0.18, 'triangle');
        beepNote(783.99, 0.2, 0.18, 0.18, 'triangle');
        beepNote(1046.5, 0.34, 0.4, 0.2, 'triangle');
      } else {
        beepNote(800, 0, 0.07, 0.08, 'sine', 1200);
      }
    } catch (e) {}
  }

  function playBeep(type) {
    if (type === 'ok' || type === 'correct' || type === 'nok') {
      if (playQuizMp3(type === 'correct' ? 'ok' : type)) return;
    }
    playBeepSynth(type);
  }
  global.playBeep = playBeep;
  if (typeof document !== 'undefined') {
    var unlockSfx = function () {
      ensureSfx();
      document.removeEventListener('pointerdown', unlockSfx, true);
      document.removeEventListener('keydown', unlockSfx, true);
    };
    document.addEventListener('pointerdown', unlockSfx, true);
    document.addEventListener('keydown', unlockSfx, true);
  }

  function beep(type) {
    try { playBeep(type); } catch (e) {}
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function youtubeId(raw) {
    if (!raw) return '';
    var s = String(raw);
    if (/^[\w-]{11}$/.test(s)) return s;
    var m = s.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
    return m ? m[1] : '';
  }

  function mediaHTML(data, opts) {
    opts = opts || {};
    var fit = data.imageFit === 'contain' || opts.contain ? 'contain' : 'cover';
    if (data.image) {
      return `<img class="qs-img qs-img-${fit}" src="${esc(data.image)}" alt="${esc(data.imageAlt || data.title || '')}" loading="eager" decoding="async" fetchpriority="high" onerror="this.classList.add('is-broken');this.nextElementSibling&&this.nextElementSibling.classList.add('show');">` +
        `<div class="qs-media-fallback qs-img-fallback" aria-hidden="true">${esc(data.icon || '🖼️')}</div>`;
    }
    return `<div class="qs-media-fallback" aria-hidden="true">${esc(data.icon || '📘')}</div>`;
  }

  function playerHTML(data) {
    if (data.embed || data.panda) {
      var src = data.embed || data.panda;
      var id = data.playerId || ('panda-' + Math.random().toString(36).slice(2, 10));
      return `<iframe id="${esc(id)}" class="qs-player qs-embed" data-qs-panda="1" src="${esc(src)}" title="${esc(data.title || 'Vídeo')}" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture" allowfullscreen fetchpriority="high"></iframe>`;
    }
    if (data.video) {
      return `<video class="qs-player" controls playsinline preload="metadata" poster="${esc(data.poster || data.image || '')}" src="${esc(data.video)}"></video>`;
    }
    var yt = youtubeId(data.youtube);
    if (yt) {
      return `<iframe class="qs-player qs-yt" src="https://www.youtube.com/embed/${esc(yt)}?rel=0" title="${esc(data.title || 'Vídeo')}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
    return '';
  }

  function videoHTML(data) {
    var live = playerHTML(data);
    var badge = data.duration ? `Vídeo a gravar · ${esc(data.duration)}` : 'Vídeo a gravar';
    if (data.video || data.youtube || data.embed || data.panda) {
      badge = data.duration ? `Vídeo · ${esc(data.duration)}` : 'Vídeo';
    }

    var stage = live
      ? `<div class="qs-video-stage">${live}</div>`
      : `<div class="qs-video-ph">
          <span class="qs-vbadge">${badge}</span>
          <div class="qs-vicon" aria-hidden="true">▶</div>
          <strong>${esc(data.scene || 'Cena a filmar')}</strong>
          <p>${esc(data.brief || data.body || '')}</p>
        </div>`;

    return `
      <article class="qs-screen is-video has-player" data-qs-root data-type="video">
        <header class="qs-video-head">
          <span class="qs-video-pill">${esc(data.kicker || '🎥 Vídeo')}</span>
          <h2 class="qs-video-title">${esc(data.title || '')}</h2>
        </header>
        <div class="qs-media qs-media-video">
          ${stage}
        </div>
      </article>`;
  }

  function imageHTML(data) {
    var bullets = Array.isArray(data.bullets) && data.bullets.length
      ? `<ul class="qs-bullets">${data.bullets.map(function (b) {
          return `<li>${esc(b)}</li>`;
        }).join('')}</ul>`
      : '';
    var body = data.body ? `<p class="qs-body">${esc(data.body)}</p>` : '';
    return `
      <article class="qs-screen is-image has-split" data-qs-root data-type="image">
        <div class="qs-media qs-media-split">
          ${mediaHTML(data, { contain: true })}
        </div>
        <div class="qs-panel qs-panel-split">
          <h2 class="qs-title">${esc(data.title || '')}</h2>
          ${body}
          ${bullets}
        </div>
      </article>`;
  }

  function coverHTML(data) {
    return `
      <article class="qs-screen is-cover" data-qs-root data-type="cover">
        <div class="qs-media">
          ${mediaHTML(data)}
          <div class="qs-cover-labels">
            <h1>${esc(data.title || '')}</h1>
            ${data.subtitle ? `<p>${esc(data.subtitle)}</p>` : ''}
          </div>
        </div>
      </article>`;
  }

  function finaleHTML(data) {
    var chips = Array.isArray(data.chips) ? data.chips : [];
    var photo = data.image
      ? `<img class="qs-finale-photo" src="${esc(data.image)}" alt="" aria-hidden="true">`
      : '';
    var chipHtml = chips.map(function (c) {
      return `<span class="qs-finale-chip">${esc(c)}</span>`;
    }).join('');
    return `
      <article class="qs-screen is-finale" data-qs-root data-type="finale">
        ${photo}
        <div class="qs-finale-veil" aria-hidden="true"></div>
        <div class="qs-finale-inner">
          ${data.kicker ? `<div class="qs-finale-kicker">${esc(data.kicker)}</div>` : ''}
          <div class="qs-finale-card medal-${esc(data.medalRank || 'none')}">
            <div class="qs-finale-eyebrow">${esc(data.eyebrow || 'Certificado de conclusão')}</div>
            <div class="qs-finale-trophy" aria-hidden="true">${esc(data.medal || '🏆')}</div>
            ${data.medalName ? `<div class="qs-finale-medal-name">${esc(data.medalName)}</div>` : ''}
            <h2 class="qs-finale-title">${esc(data.title || 'Parabéns')}<span>!</span></h2>
            <div class="qs-finale-line" aria-hidden="true"></div>
            ${data.points != null ? `<div class="qs-finale-score">${esc(data.points)}<small> / ${esc(data.maxPoints != null ? data.maxPoints : '')} pts</small></div>` : ''}
            ${data.hits != null ? `<p class="qs-finale-hits">${esc(data.hits)} acertos em ${esc(data.questions != null ? data.questions : '')} questões</p>` : ''}
            <p class="qs-finale-body">${esc(data.body || data.subtitle || '')}</p>
            ${chipHtml ? `<div class="qs-finale-chips">${chipHtml}</div>` : ''}
          </div>
        </div>
      </article>`;
  }

  function contentBlocks(data) {
    var html = '';
    if (data.body) html += `<p class="qs-body">${esc(data.body)}</p>`;
    if (Array.isArray(data.stats) && data.stats.length) {
      html += `<div class="qs-stats">${data.stats.map(function (s) {
        return `<div class="qs-stat">
          ${s.icon ? `<span class="qs-stat-ico" aria-hidden="true">${esc(s.icon)}</span>` : ''}
          <div class="qs-stat-num">${esc(s.num || '')}</div>
          <div class="qs-stat-lbl">${esc(s.label || '')}</div>
        </div>`;
      }).join('')}</div>`;
    }
    if (Array.isArray(data.cards) && data.cards.length) {
      html += `<div class="qs-cards count-${data.cards.length}">${data.cards.map(function (c) {
        return `<article class="qs-card">
          ${c.icon ? `<div class="qs-card-ico" aria-hidden="true">${esc(c.icon)}</div>` : ''}
          ${c.title ? `<h3>${esc(c.title)}</h3>` : ''}
          ${c.body ? `<p>${esc(c.body)}</p>` : ''}
        </article>`;
      }).join('')}</div>`;
    }
    if (Array.isArray(data.items) && data.items.length) {
      html += `<div class="qs-items">${data.items.map(function (it) {
        var mark = it.n != null
          ? `<span class="qs-item-num">${esc(it.n)}</span>`
          : (it.icon ? `<span class="qs-item-ico" aria-hidden="true">${esc(it.icon)}</span>` : '');
        var title = it.title ? `<b>${esc(it.title)}</b> ` : '';
        return `<div class="qs-item">${mark}<p>${title}${esc(it.text || it.body || '')}</p></div>`;
      }).join('')}</div>`;
    }
    if (Array.isArray(data.compare) && data.compare.length) {
      html += `<div class="qs-compare">${data.compare.map(function (c) {
        var ok = !!c.ok;
        return `<article class="qs-compare-col ${ok ? 'is-ok' : 'is-bad'}">
          <div class="qs-compare-lbl">${esc(c.label || (ok ? '✓ Correto' : '✕ Evitar'))}</div>
          <p>${esc(c.text || c.body || '')}</p>
        </article>`;
      }).join('')}</div>`;
    }
    if (Array.isArray(data.bullets) && data.bullets.length) {
      html += `<ul class="qs-bullets">${data.bullets.map(function (b) {
        return `<li>${esc(b)}</li>`;
      }).join('')}</ul>`;
    }
    if (Array.isArray(data.rules) && data.rules.length) {
      html += `<div class="qs-rules">${data.rules.map(function (r) {
        return `<article class="qs-rule"><p>${esc(r.text || r.body || '')}</p></article>`;
      }).join('')}</div>`;
    }
    if (data.quote) html += `<blockquote class="qs-quote">${esc(data.quote)}</blockquote>`;
    if (data.note) {
      if (typeof data.note === 'object' && data.note) {
        html += `<aside class="qs-note qs-note-card">
          ${data.note.label ? `<strong class="qs-note-label">${esc(data.note.label)}</strong>` : ''}
          <span class="qs-note-text">${esc(data.note.text || data.note.body || '')}</span>
        </aside>`;
      } else {
        html += `<p class="qs-note">${esc(data.note)}</p>`;
      }
    }
    return html;
  }

  function contentHTML(data) {
    var hasImg = !!data.image;
    var rulesCount = Array.isArray(data.rules) ? data.rules.length : 0;
    var normCompact = !!(data.compact || (hasImg && rulesCount > 0));
    var head = `<h2 class="qs-title">${esc(data.title || '')}</h2>
          ${contentBlocks(data)}`;
    if (hasImg) {
      var extra = '';
      if (normCompact) extra += ' is-norm-compact';
      if (rulesCount >= 4) extra += ' is-norm-rules';
      if (Array.isArray(data.stats) && data.stats.length) extra += ' is-norm-stats';
      return `
      <article class="qs-screen is-content has-split${extra}" data-qs-root data-type="content">
        <div class="qs-media qs-media-split">
          ${mediaHTML(data)}
        </div>
        <div class="qs-panel qs-panel-split">
          ${head}
        </div>
      </article>`;
    }
    var dense = (data.items && data.items.length > 6) || (data.cards && data.cards.length > 3);
    return `
      <article class="qs-screen is-content is-text${dense ? ' is-dense' : ''}" data-qs-root data-type="content">
        <div class="qs-panel qs-panel-text">
          ${head}
        </div>
      </article>`;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function reflectHTML(data) {
    var choices = Array.isArray(data.choices) ? data.choices : [];
    var choiceHtml = choices.length
      ? `<div class="qs-reflect-choices">${choices.map(function (c, i) {
          return `<button type="button" class="qs-reflect-choice" data-qs-choice="${i}">${c.icon ? `<span aria-hidden="true">${esc(c.icon)}</span>` : ''}${esc(c.text || c.label || '')}</button>`;
        }).join('')}</div>`
      : `<button type="button" class="qs-reflect-tap" data-qs-reveal>Toque para pensar</button>`;
    var prompt = esc(data.prompt || data.body || '');
    if (data.promptAccent) {
      prompt = esc(data.prompt || '') + (data.prompt ? '<br>' : '') +
        '<span>' + esc(data.promptAccent) + '</span>';
    }
    return `
      <article class="qs-screen is-content is-text is-reflect" data-qs-root data-type="reflect">
        <div class="qs-panel qs-panel-text qs-panel-reflect">
          <header class="qs-reflect-head">
            <h2 class="qs-title">${esc(data.title || '')}</h2>
          </header>
          <div class="qs-reflect">
            <p class="qs-reflect-prompt">${prompt}</p>
            <div class="qs-reflect-mark" aria-hidden="true">?</div>
            ${choiceHtml}
            <p class="qs-reflect-answer" data-qs-answer hidden>${esc(data.answer || data.quote || '')}</p>
          </div>
        </div>
      </article>`;
  }

  function compareHTML(data) {
    var sides = Array.isArray(data.compare) ? data.compare : [];
    var hasPhotos = sides.some(function (c) { return !!c.image; });
    var open = !!data.open;
    return `
      <article class="qs-screen is-content is-text is-compare${hasPhotos ? ' has-photos' : ''}${open ? ' is-open' : ''}" data-qs-root data-type="compare">
        <div class="qs-panel qs-panel-text">
          <h2 class="qs-title">${esc(data.title || '')}</h2>
          ${data.body && !open ? `<p class="qs-compare-guide">${esc(data.body)}</p>` : ''}
          <div class="qs-compare">${sides.map(function (c, i) {
            var ok = !!c.ok;
            var img = c.image
              ? `<div class="qs-compare-media"><img class="qs-compare-img" src="${esc(c.image)}" alt="${esc(c.imageAlt || c.label || '')}" loading="eager" decoding="async"></div>`
              : '';
            return `<button type="button" class="qs-compare-col ${ok ? 'is-ok' : 'is-bad'}${c.image ? ' has-img' : ''}${open ? ' is-open' : ''}" data-qs-compare="${i}"${open ? ' disabled' : ''}>
              <div class="qs-compare-lbl">${esc(c.label || (ok ? '✓ Correto' : '✕ Evitar'))}</div>
              ${img}
              ${open ? '' : '<p class="qs-compare-hint">Toque para ver</p>'}
              <p class="qs-compare-reveal"${open ? '' : ' hidden'}>${esc(c.text || c.body || '')}</p>
            </button>`;
          }).join('')}</div>
        </div>
      </article>`;
  }

  function orderHTML(data) {
    var items = Array.isArray(data.items) ? data.items : [];
    var cards = shuffle(items).map(function (it) {
      return `<button type="button" class="qs-seq-card" data-qs-seq="${esc(it.key)}">
        <span class="qs-seq-badge" aria-hidden="true"></span>
        <span>${esc(it.text)}</span>
      </button>`;
    }).join('');
    return `
      <article class="qs-screen is-content is-text is-order is-timed" data-qs-root data-type="order">
        <div class="qs-qbar-wrap"><div class="qs-qbar"><i data-qs-timer></i></div></div>
        <div class="qs-panel qs-panel-text">
          <h2 class="qs-title">${esc(data.title || 'Ordene a rotina')}</h2>
          <p class="qs-body">${esc(data.body || 'Toque nos cuidados na ordem que você seguiria.')}</p>
          <p class="qs-seq-progress" data-qs-seq-progress>0 de ${items.length} selecionados</p>
          <div class="qs-seq-wrap">${cards}</div>
          <p class="qs-seq-fb" data-qs-seq-fb hidden></p>
        </div>
      </article>`;
  }

  function matchHTML(data) {
    var pairs = Array.isArray(data.pairs) ? data.pairs : [];
    return `
      <article class="qs-screen is-content is-text is-match is-dense" data-qs-root data-type="match">
        <div class="qs-panel qs-panel-text">
          <h2 class="qs-title">${esc(data.title || 'Associe os pares')}</h2>
          <div class="qs-match-hud">
            <span data-qs-match-time>⏱️ 0s</span>
            <span data-qs-match-progress>0 de ${pairs.length} pares</span>
          </div>
          <div class="qs-match">
            <div>
              <div class="qs-match-col-title">Exercício</div>
              <div data-qs-match-ex></div>
            </div>
            <div>
              <div class="qs-match-col-title">Região do corpo</div>
              <div data-qs-match-body></div>
            </div>
          </div>
        </div>
      </article>`;
  }

  function quizIntroHTML(data) {
    var count = data.count != null ? Number(data.count) : null;
    var min = data.minCorrect != null ? Number(data.minCorrect) : null;
    var desc = data.body || '';
    if (!desc && count) {
      desc = 'Responda <strong>' + count + '</strong> perguntas de múltipla escolha.';
      if (min) desc += ' Você precisa acertar no mínimo <strong>' + min + '</strong> para avançar.';
      desc += ' Cada acerto vale até <strong>50 pontos</strong> — quanto mais rápido, mais pontos.';
    }
    return `
      <article class="qs-screen is-quiz-intro" data-qs-root data-type="quiz-intro">
        <div class="qs-quiz-intro">
          <div class="qs-quiz-intro-icon" aria-hidden="true">${esc(data.icon || '🎮')}</div>
          <h2 class="qs-quiz-intro-title">${esc(data.title || 'Desafio do módulo')}</h2>
          <p class="qs-quiz-intro-desc">${desc}</p>
          <button type="button" class="qs-quiz-intro-btn" data-qs-start>Iniciar desafio</button>
        </div>
      </article>`;
  }

  function quizResultHTML(data) {
    var passed = !!data.passed;
    var hits = data.score != null ? data.score : 0;
    var total = data.total != null ? data.total : 0;
    var min = data.minCorrect != null ? data.minCorrect : 0;
    var points = data.points != null ? data.points : 0;
    var streak = data.streak != null ? data.streak : 0;
    var medal = data.medal || data.icon || (passed ? '🥇' : '📚');
    var medalName = data.medalName || '';
    var rank = data.medalRank || (passed ? 'gold' : 'none');
    var title = data.title || (passed ? 'Desafio concluído!' : 'Desafio não concluído');
    var unlock = data.titleUnlock || null;
    var hasTitle = !!(passed && unlock && unlock.title);
    var desc = data.body || (passed
      ? ('Você acertou <strong>' + hits + '</strong> de <strong>' + total + '</strong> questões.')
      : ('Você acertou <strong>' + hits + '</strong> de <strong>' + total + '</strong>. É necessário acertar pelo menos <strong>' + min + '</strong>. Estude e tente novamente.'));
    var actions = passed
      ? `<button type="button" class="qs-quiz-intro-btn" data-qs-finish>Continuar</button>`
      : `<button type="button" class="qs-quiz-intro-btn" data-qs-retry>Jogar novamente</button>`;
    var scoreBar = `<div class="qs-result-scorebar" aria-label="Placar">
        <span><b>${points}</b> pts</span>
        <span class="qs-result-scorebar-dot" aria-hidden="true"></span>
        <span><b>${hits}/${total}</b> acertos</span>
        ${streak ? `<span class="qs-result-scorebar-dot" aria-hidden="true"></span><span>seq. <b>${streak}</b></span>` : ''}
      </div>`;

    if (hasTitle) {
      return `
      <article class="qs-screen is-quiz-result" data-qs-root data-type="quiz-result">
        <div class="qs-quiz-result is-pass is-title-focus medal-${esc(rank)}">
          <p class="qs-result-eyebrow">${esc(unlock.moduleLabel || 'Módulo concluído')}</p>
          <div class="qs-medal" aria-hidden="true">
            <span class="qs-medal-face">${esc(medal)}</span>
          </div>
          <p class="qs-title-earned-kicker">Título conquistado</p>
          <h2 class="qs-title-earned-name">${esc(unlock.title)}</h2>
          ${unlock.body ? `<p class="qs-title-earned-body">${esc(unlock.body)}</p>` : ''}
          ${scoreBar}
          <div class="qs-quiz-result-actions">${actions}</div>
        </div>
      </article>`;
    }

    return `
      <article class="qs-screen is-quiz-result" data-qs-root data-type="quiz-result">
        <div class="qs-quiz-result ${passed ? 'is-pass' : 'is-fail'} medal-${esc(rank)}">
          <div class="qs-medal" aria-hidden="true">
            <span class="qs-medal-face">${esc(medal)}</span>
          </div>
          ${medalName ? `<div class="qs-medal-name">${esc(medalName)}</div>` : ''}
          <h2 class="qs-quiz-result-title">${esc(title)}</h2>
          ${scoreBar}
          <p class="qs-quiz-result-desc">${desc}</p>
          <div class="qs-quiz-result-actions">${actions}</div>
        </div>
      </article>`;
  }

  function questionHTML(data) {
    var alts = Array.isArray(data.alternatives) ? data.alternatives.slice(0, 4) : [];
    var count = Math.max(1, alts.length);
    var opts = alts.map(function (a, i) {
      return `
        <button type="button" class="qs-opt" data-tone="${i % 4}" data-id="${esc(a.id != null ? a.id : i)}" data-index="${i}">
          <span class="qs-num">${i + 1}</span>
          <span class="qs-txt">${esc(a.text)}</span>
          <span class="qs-mark" aria-hidden="true"></span>
        </button>`;
    }).join('');

    return `
      <article class="qs-screen is-question" data-qs-root data-type="question">
        <div class="qs-timer" aria-hidden="true"><i data-qs-timer></i></div>
        <div class="qs-media qs-media-hero">
          ${mediaHTML(data)}
          <div class="qs-result-banner" data-qs-result role="status" aria-live="polite" hidden>
            <span data-qs-result-text></span>
          </div>
        </div>
        <div class="qs-qbar-wrap">
          <div class="qs-qbar">${esc(data.question || '')}</div>
        </div>
        <div class="qs-opts count-${count}" data-qs-opts>
          ${opts}
        </div>
        <div class="qs-foot qs-foot-quiz">
          <div class="qs-explain" data-qs-explain></div>
        </div>
      </article>`;
  }

  function QuestionScreen(container, data, options) {
    this.el = typeof container === 'string' ? document.querySelector(container) : container;
    this.options = options || {};
    this.state = { answered: false, selectedIndex: null, correct: false };
    this.data = null;
    this._onClick = this._onClick.bind(this);
    this.update(data || {});
  }

  QuestionScreen.mount = function (container, data, options) {
    return new QuestionScreen(container, data, options);
  };

  QuestionScreen.prototype.update = function (data) {
    this._stopTimer();
    this.data = data || {};
    this.state.answered = false;
    this.state.selectedIndex = null;
    this.state.correct = false;

    var type = this.data.type || 'question';
    var html = questionHTML(this.data);
    if (type === 'cover') html = coverHTML(this.data);
    else if (type === 'finale') html = finaleHTML(this.data);
    else if (type === 'content') html = contentHTML(this.data);
    else if (type === 'video') html = videoHTML(this.data);
    else if (type === 'image') html = imageHTML(this.data);
    else if (type === 'reflect') html = reflectHTML(this.data);
    else if (type === 'compare') html = compareHTML(this.data);
    else if (type === 'order') html = orderHTML(this.data);
    else if (type === 'match') html = matchHTML(this.data);
    else if (type === 'quiz-intro') html = quizIntroHTML(this.data);
    else if (type === 'quiz-result') html = quizResultHTML(this.data);

    this.el.innerHTML = html;
    this.root = this.el.querySelector('[data-qs-root]');
    this.el.removeEventListener('click', this._onClick);
    this.el.addEventListener('click', this._onClick);

    var gated = type === 'question' || type === 'order' || type === 'match' || type === 'reflect' || type === 'compare';
    if (!gated) this.state.answered = true;

    if (type === 'video' && (this.data.embed || this.data.panda || this.data.youtube || this.data.video)) {
      this._bindVideoTags();
    }
    if (type === 'reflect') this._bindReflect();
    if (type === 'compare') this._bindCompare();
    if (type === 'order') this._bindOrder();
    if (type === 'match') this._bindMatch();

    if ((type === 'question' || type === 'order') && this.options.quizScoring) {
      if (this.root) this.root.classList.add('is-timed');
      this._startTimer();
    }

    if (typeof this.options.onRender === 'function') {
      this.options.onRender(this.data, this);
    }
  };

  QuestionScreen.prototype._stopTimer = function () {
    if (this._tick) {
      clearInterval(this._tick);
      this._tick = null;
    }
  };

  QuestionScreen.prototype._startTimer = function () {
    this._stopTimer();
    var self = this;
    var total = Number(this.options.time || this.data.time || 12);
    this._tTot = total;
    this._tLeft = total;
    var bar = this.el.querySelector('[data-qs-timer]');
    if (bar) bar.style.width = '100%';
    this._tick = setInterval(function () {
      if (self.state.answered) {
        self._stopTimer();
        return;
      }
      self._tLeft -= 0.1;
      if (bar) bar.style.width = (Math.max(0, self._tLeft / self._tTot) * 100) + '%';
      if (self._tLeft <= 0) {
        self._stopTimer();
        self.timesUp();
      }
    }, 100);
  };

  QuestionScreen.prototype._quizPoints = function (correct) {
    if (!correct) return 0;
    var ratio = this._tTot ? Math.max(0, Math.min(1, this._tLeft / this._tTot)) : 1;
    var max = this.options.maxPoints != null ? Number(this.options.maxPoints) : 50;
    return Math.max(5, Math.min(max, Math.round(max * ratio)));
  };

  QuestionScreen.prototype._setVideoPlaying = function (on) {
    var root = this.el.querySelector('[data-qs-root]') || this.root;
    if (root) root.classList.toggle('is-playing', !!on);
  };

  QuestionScreen.prototype._bindVideoTags = function () {
    var self = this;
    var root = this.el;
    var native = root.querySelector('video.qs-player');
    var iframe = root.querySelector('iframe[data-qs-panda]');

    function expand() { self._setVideoPlaying(true); }
    function collapse() { self._setVideoPlaying(false); }

    if (native) {
      native.addEventListener('play', expand);
      native.addEventListener('pause', collapse);
      native.addEventListener('ended', collapse);
    }

    this._onVideoMsg = function (ev) {
      var data = ev && ev.data;
      if (data == null) return;
      var msg = '';
      if (typeof data === 'object') {
        msg = data.message || data.event || data.type || '';
      } else if (typeof data === 'string') {
        msg = data;
        try {
          var parsed = JSON.parse(data);
          msg = parsed.message || parsed.event || parsed.type || data;
        } catch (e) {}
      }
      msg = String(msg).toLowerCase();
      if (msg === 'panda_play' || msg.indexOf('panda_play') !== -1) expand();
      if (msg === 'panda_pause' || msg.indexOf('panda_pause') !== -1) collapse();
      if (msg === 'panda_ended' || msg.indexOf('panda_ended') !== -1 || msg.indexOf('panda_complete') !== -1) collapse();
    };
    window.addEventListener('message', this._onVideoMsg);

    if (iframe && iframe.id) {
      this._ensurePandaApi(iframe.id, expand, collapse);
    }
  };

  QuestionScreen.prototype._ensurePandaApi = function (iframeId, onPlay, onIdle) {
    var API = 'https://player.pandavideo.com.br/api.v2.js';
    function bind() {
      try {
        if (typeof PandaPlayer === 'undefined') return;
        var player = new PandaPlayer(iframeId, {
          onReady: function () {
            try {
              player.onEvent(function (e) {
                var msg = e && e.message;
                if (msg === 'panda_play') onPlay();
                if (msg === 'panda_pause' || msg === 'panda_ended') onIdle();
              });
            } catch (err) {}
          }
        });
      } catch (err) {}
    }
    window.pandascripttag = window.pandascripttag || [];
    window.pandascripttag.push(bind);
    if (!document.querySelector('script[src="' + API + '"]')) {
      var s = document.createElement('script');
      s.src = API;
      s.async = true;
      document.head.appendChild(s);
    } else if (typeof PandaPlayer !== 'undefined') {
      bind();
    }
  };

  QuestionScreen.prototype._onClick = function (e) {
    var opt = e.target.closest('.qs-opt');
    var start = e.target.closest('[data-qs-start]');
    var retry = e.target.closest('[data-qs-retry]');
    var finish = e.target.closest('[data-qs-finish]');
    if (opt && !this.state.answered) {
      beep('click');
      this.select(+opt.dataset.index);
      return;
    }
    if (start || retry || finish) {
      beep('click');
      if (typeof this.options.onContinue === 'function') {
        this.options.onContinue({
          data: this.data,
          action: start ? 'start' : (retry ? 'retry' : 'finish')
        });
      }
    }
  };

  QuestionScreen.prototype.timesUp = function () {
    if (this.state.answered) return;
    if (this.data.type === 'order') {
      this._finishOrder(true);
      return;
    }
    this.select(-1, { timedOut: true });
  };

  QuestionScreen.prototype._complete = function (info) {
    if (this.state.answered && this.data.type !== 'match') return;
    this.state.answered = true;
    this._stopTimer();
    if (typeof this.options.onSelect === 'function') {
      this.options.onSelect(Object.assign({
        correct: true,
        points: 0,
        timedOut: false,
        data: this.data
      }, info || {}));
    }
  };

  QuestionScreen.prototype._bindReflect = function () {
    var self = this;
    var root = this.el;
    var card = root.querySelector('.qs-reflect');
    var answer = root.querySelector('[data-qs-answer]');
    function reveal(btn) {
      beep('click');
      if (btn) btn.classList.add('is-chosen');
      if (card) card.classList.add('is-revealed');
      if (answer) {
        answer.hidden = false;
        answer.classList.add('show');
      }
      var tap = root.querySelector('[data-qs-reveal]');
      if (tap) tap.hidden = true;
      if (!self.state.answered) {
        beep('ok');
        self._complete({ kind: 'reflect' });
      }
    }
    root.querySelectorAll('[data-qs-choice]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        root.querySelectorAll('[data-qs-choice]').forEach(function (b) { b.classList.remove('is-chosen'); });
        reveal(btn);
      });
    });
    var tap = root.querySelector('[data-qs-reveal]');
    if (tap) tap.addEventListener('click', function () { reveal(tap); });
  };

  QuestionScreen.prototype._bindCompare = function () {
    var self = this;
    if (this.data && this.data.open) {
      self._complete({ kind: 'compare' });
      return;
    }
    var opened = {};
    var cols = this.el.querySelectorAll('[data-qs-compare]');
    cols.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.classList.contains('is-open')) return;
        btn.classList.add('is-open');
        beep('click');
        var hint = btn.querySelector('.qs-compare-hint');
        var reveal = btn.querySelector('.qs-compare-reveal');
        if (hint) hint.hidden = true;
        if (reveal) reveal.hidden = false;
        opened[btn.getAttribute('data-qs-compare')] = true;
        if (Object.keys(opened).length >= cols.length) {
          beep('ok');
          self._complete({ kind: 'compare' });
        }
      });
    });
  };

  QuestionScreen.prototype._bindOrder = function () {
    var self = this;
    this._seqTapped = [];
    this.el.querySelectorAll('[data-qs-seq]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (self.state.answered || btn.classList.contains('is-picked')) return;
        beep('click');
        var key = btn.getAttribute('data-qs-seq');
        self._seqTapped.push(key);
        btn.classList.add('is-picked');
        var badge = btn.querySelector('.qs-seq-badge');
        if (badge) badge.textContent = String(self._seqTapped.length);
        var prog = self.el.querySelector('[data-qs-seq-progress]');
        var total = (self.data.items || []).length;
        if (prog) prog.textContent = self._seqTapped.length + ' de ' + total + ' selecionados';
        if (self._seqTapped.length >= total) self._finishOrder(false);
      });
    });
  };

  QuestionScreen.prototype._finishOrder = function (timedOut) {
    if (this.state.answered) return;
    this._stopTimer();
    var items = this.data.items || [];
    var expected = items.slice().sort(function (a, b) { return a.rank - b.rank; }).map(function (it) { return it.key; });
    var tapped = this._seqTapped || [];
    var correct = !timedOut && tapped.length === expected.length;
    if (correct) {
      for (var i = 0; i < expected.length; i++) {
        if (tapped[i] !== expected[i]) { correct = false; break; }
      }
    }
    this.el.querySelectorAll('[data-qs-seq]').forEach(function (c) {
      c.classList.add('is-picked');
      c.style.pointerEvents = 'none';
    });
    var fb = this.el.querySelector('[data-qs-seq-fb]');
    if (fb) {
      fb.hidden = false;
      fb.className = 'qs-seq-fb ' + (correct ? 'is-ok' : 'is-nok');
      var orderTxt = items.slice().sort(function (a, b) { return a.rank - b.rank; }).map(function (it, i) {
        return (i + 1) + '. ' + it.text;
      }).join(' · ');
      fb.textContent = (timedOut ? 'Tempo esgotado. ' : '') + (correct ? 'Ordem certa! ' : 'Essa não é a ordem mais lógica. ') + orderTxt;
    }
    var pts = this.options.quizScoring ? this._quizPoints(correct) : 0;
    beep(correct ? 'ok' : 'nok');
    this._complete({ kind: 'order', correct: correct, points: pts, timedOut: !!timedOut });
  };

  QuestionScreen.prototype._bindMatch = function () {
    var self = this;
    var pairs = this.data.pairs || [];
    var exOrder = pairs.map(function (_, i) { return i; });
    var bodyOrder = shuffle(exOrder);
    var matched = {};
    var matchedCount = 0;
    var selectedEx = null;
    var selectedBody = null;
    var elapsed = 0;
    this._matchTick = setInterval(function () {
      elapsed += 1;
      var el = self.el.querySelector('[data-qs-match-time]');
      if (el) el.textContent = '⏱️ ' + elapsed + 's';
    }, 1000);

    function render() {
      var exCol = self.el.querySelector('[data-qs-match-ex]');
      var bodyCol = self.el.querySelector('[data-qs-match-body]');
      if (!exCol || !bodyCol) return;
      exCol.innerHTML = '';
      bodyCol.innerHTML = '';
      exOrder.forEach(function (id) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'qs-match-item' + (matched[id] ? ' is-matched' : '');
        btn.textContent = pairs[id].ex;
        if (matched[id]) btn.disabled = true;
        btn.addEventListener('click', function () { pick('ex', id, btn); });
        exCol.appendChild(btn);
      });
      bodyOrder.forEach(function (id) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'qs-match-item' + (matched[id] ? ' is-matched' : '');
        btn.textContent = pairs[id].body;
        if (matched[id]) btn.disabled = true;
        btn.addEventListener('click', function () { pick('body', id, btn); });
        bodyCol.appendChild(btn);
      });
      var prog = self.el.querySelector('[data-qs-match-progress]');
      if (prog) prog.textContent = matchedCount + ' de ' + pairs.length + ' pares';
    }

    function clearSel() {
      self.el.querySelectorAll('.qs-match-item').forEach(function (el) { el.classList.remove('is-selected'); });
      selectedEx = null;
      selectedBody = null;
    }

    function pick(side, id, btn) {
      if (matched[id] || self.state.answered) return;
      beep('click');
      var sel = side === 'ex' ? '[data-qs-match-ex] .qs-match-item' : '[data-qs-match-body] .qs-match-item';
      self.el.querySelectorAll(sel).forEach(function (el) { el.classList.remove('is-selected'); });
      btn.classList.add('is-selected');
      if (side === 'ex') selectedEx = id;
      else selectedBody = id;
      if (selectedEx == null || selectedBody == null) return;
      if (selectedEx === selectedBody) {
        matched[selectedEx] = true;
        matchedCount += 1;
        clearSel();
        render();
        if (matchedCount >= pairs.length) {
          if (self._matchTick) { clearInterval(self._matchTick); self._matchTick = null; }
          var cap = 90;
          var ratio = Math.max(0, Math.min(1, 1 - (elapsed / cap)));
          var max = self.options.maxPoints != null ? Number(self.options.maxPoints) : 50;
          var pts = Math.max(5, Math.min(max, Math.round(max * (0.4 + 0.6 * ratio))));
          beep('end');
          self._complete({ kind: 'match', correct: true, points: pts, elapsed: elapsed });
        } else {
          beep('ok');
        }
      } else {
        beep('nok');
        var a = self.el.querySelector('[data-qs-match-ex] .is-selected');
        var b = self.el.querySelector('[data-qs-match-body] .is-selected');
        [a, b].forEach(function (el) {
          if (!el) return;
          el.classList.add('is-wrong');
          setTimeout(function () { el.classList.remove('is-wrong'); }, 400);
        });
        setTimeout(clearSel, 420);
      }
    }

    render();
  };

  QuestionScreen.prototype.select = function (index, extra) {
    if (this.state.answered) return;
    extra = extra || {};
    var alts = this.data.alternatives || [];
    var timedOut = !!extra.timedOut || index < 0;
    if (!timedOut && (index < 0 || index >= alts.length)) return;

    this._stopTimer();
    this.state.answered = true;
    this.state.selectedIndex = timedOut ? null : index;
    var opinion = !!this.data.opinion;
    var chosen = timedOut ? null : alts[index];
    var correctIndex = alts.findIndex(function (a) { return !!a.correct; });
    var isCorrect = timedOut ? false : (opinion ? true : !!(chosen && chosen.correct));
    this.state.correct = isCorrect;
    var pts = this.options.quizScoring ? this._quizPoints(isCorrect) : 0;
    this.state.points = pts;

    var buttons = this.el.querySelectorAll('.qs-opt');
    buttons.forEach(function (btn, i) {
      btn.disabled = true;
      btn.classList.add('is-revealed');
      if (!timedOut && i === index) btn.classList.add('is-selected');
      if (opinion) {
        if (i === index) {
          btn.classList.add('is-correct');
          btn.querySelector('.qs-mark').textContent = '✓';
        } else {
          btn.classList.add('is-dim');
        }
        return;
      }
      if (isCorrect && i === correctIndex) {
        btn.classList.add('is-correct');
        btn.querySelector('.qs-mark').textContent = '✓';
      } else if (!timedOut && i === index) {
        btn.classList.add('is-wrong');
        btn.querySelector('.qs-mark').textContent = '✕';
      } else {
        btn.classList.add('is-dim');
      }
    });

    var media = this.el.querySelector('.qs-media');
    if (media) {
      media.classList.remove('is-ok', 'is-nok');
      media.classList.add('is-answered', isCorrect ? 'is-ok' : 'is-nok');
    }

    var result = this.el.querySelector('[data-qs-result]');
    if (result) {
      result.hidden = false;
      var resultText = result.querySelector('[data-qs-result-text]');
      var label = 'Não foi dessa vez';
      if (opinion) label = 'Registrado';
      else if (timedOut) label = 'Tempo esgotado';
      else if (isCorrect) label = pts ? ('Acertou · +' + pts) : 'Acertou';
      if (resultText) resultText.textContent = label;
    }

    var explain = this.el.querySelector('[data-qs-explain]');
    if (explain) {
      var explainText = this.data.explanation || '';
      if (explainText) {
        explain.textContent = explainText;
        explain.classList.add('show', isCorrect ? 'is-ok' : 'is-nok');
      }
    }

    beep(isCorrect ? 'ok' : 'nok');

    if (typeof this.options.onSelect === 'function') {
      this.options.onSelect({
        correct: isCorrect,
        selectedIndex: this.state.selectedIndex,
        points: pts,
        timedOut: timedOut,
        data: this.data
      });
    }
  };

  QuestionScreen.prototype.destroy = function () {
    this._stopTimer();
    if (this._matchTick) {
      clearInterval(this._matchTick);
      this._matchTick = null;
    }
    var vid = this.el.querySelector('video');
    if (vid) { try { vid.pause(); } catch (e) {} }
    if (this._onVideoMsg) {
      window.removeEventListener('message', this._onVideoMsg);
      this._onVideoMsg = null;
    }
    this.el.removeEventListener('click', this._onClick);
    this.el.innerHTML = '';
  };

  global.QuestionScreen = QuestionScreen;
})(typeof window !== 'undefined' ? window : globalThis);
