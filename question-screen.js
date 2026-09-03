/**
 * QuestionScreen — componente reutilizável (vanilla JS)
 *
 * Tipos (JSON) — tudo DENTRO do cartão:
 *  - cover:    { type, title, subtitle?, image? }
 *  - content:  { type, kicker?, title, body?, bullets?, image? }
 *  - video:    { type, title, kicker?, duration?, scene?, brief?, video?, youtube?, image?/poster? }
 *  - image:    { type, title, kicker?, body?, bullets?, image, imageFit? }
 *  - quiz-intro: { type, title, body?, count?, minCorrect?, image? }
 *  - quiz-result: { type, passed, score, total, minCorrect, title? }
 *  - question: { type, question, alternatives[2..4], explanation?, image?, opinion? }
 *
 * video: se tiver `video` (mp4) ou `youtube` (id/url), toca o player;
 *        senão mostra o placeholder "Vídeo a gravar" (como no treinamento).
 */
(function (global) {
  'use strict';

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
      return `<img class="qs-img qs-img-${fit}" src="${esc(data.image)}" alt="${esc(data.imageAlt || data.title || '')}" loading="eager" onerror="this.classList.add('is-broken');this.nextElementSibling&&this.nextElementSibling.classList.add('show');">` +
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
          ${data.kicker ? `<div class="qs-kicker">${esc(data.kicker)}</div>` : ''}
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

  function contentHTML(data) {
    var bullets = Array.isArray(data.bullets) && data.bullets.length
      ? `<ul class="qs-bullets">${data.bullets.map(function (b) {
          return `<li>${esc(b)}</li>`;
        }).join('')}</ul>`
      : '';
    var body = data.body ? `<p class="qs-body">${esc(data.body)}</p>` : '';
    var hasImg = !!data.image;
    return `
      <article class="qs-screen is-content${hasImg ? ' has-split' : ''}" data-qs-root data-type="content">
        <div class="qs-media ${hasImg ? 'qs-media-split' : 'qs-media-sm'}">
          ${mediaHTML(data)}
        </div>
        <div class="qs-panel${hasImg ? ' qs-panel-split' : ''}">
          ${data.kicker ? `<div class="qs-kicker">${esc(data.kicker)}</div>` : ''}
          <h2 class="qs-title">${esc(data.title || '')}</h2>
          ${body}
          ${bullets}
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
      desc += ' Quanto mais rápido acertar, mais pontos.';
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
    var desc = data.body || (passed
      ? ('Você acertou <strong>' + hits + '</strong> de <strong>' + total + '</strong> questões. Parabéns! Pode avançar.')
      : ('Você acertou <strong>' + hits + '</strong> de <strong>' + total + '</strong>. É necessário acertar pelo menos <strong>' + min + '</strong>. Estude e tente novamente.'));
    var actions = passed
      ? `<button type="button" class="qs-quiz-intro-btn" data-qs-finish>Continuar</button>`
      : `<button type="button" class="qs-quiz-intro-btn" data-qs-retry>Jogar novamente</button>`;
    return `
      <article class="qs-screen is-quiz-result" data-qs-root data-type="quiz-result">
        <div class="qs-quiz-result ${passed ? 'is-pass' : 'is-fail'} medal-${esc(rank)}">
          <div class="qs-medal" aria-hidden="true">
            <span class="qs-medal-face">${esc(medal)}</span>
          </div>
          ${medalName ? `<div class="qs-medal-name">${esc(medalName)}</div>` : ''}
          <h2 class="qs-quiz-result-title">${esc(title)}</h2>
          <div class="qs-quiz-result-points">${points}<small>pts</small></div>
          <p class="qs-quiz-result-desc">${desc}</p>
          <div class="qs-quiz-result-stats">
            <span>${hits}/${total} acertos</span>
            <span>melhor sequência ${streak}</span>
          </div>
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
          <div class="qs-ribbon" data-qs-ribbon role="status" aria-live="polite">
            <span class="qs-badge" data-qs-ribbon-icon></span>
            <span data-qs-ribbon-text></span>
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
    else if (type === 'content') html = contentHTML(this.data);
    else if (type === 'video') html = videoHTML(this.data);
    else if (type === 'image') html = imageHTML(this.data);
    else if (type === 'quiz-intro') html = quizIntroHTML(this.data);
    else if (type === 'quiz-result') html = quizResultHTML(this.data);

    this.el.innerHTML = html;
    this.root = this.el.querySelector('[data-qs-root]');
    this.el.removeEventListener('click', this._onClick);
    this.el.addEventListener('click', this._onClick);

    if (type !== 'question') this.state.answered = true;

    if (type === 'video' && (this.data.embed || this.data.panda || this.data.youtube || this.data.video)) {
      this._bindVideoTags();
    }

    if (type === 'question' && this.options.quizScoring) {
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
    return Math.round(400 + (1000 - 400) * ratio);
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
      this.select(+opt.dataset.index);
      return;
    }
    if (start || retry || finish) {
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
    this.select(-1, { timedOut: true });
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
      if (i === correctIndex) {
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
    if (media) media.classList.add('is-answered');

    var ribbon = this.el.querySelector('[data-qs-ribbon]');
    if (ribbon) {
      ribbon.classList.remove('show', 'ok', 'nok');
      void ribbon.offsetWidth;
      ribbon.classList.add('show', isCorrect ? 'ok' : 'nok');
      var icon = ribbon.querySelector('[data-qs-ribbon-icon]');
      var text = ribbon.querySelector('[data-qs-ribbon-text]');
      if (icon) icon.textContent = isCorrect ? '✓' : '✕';
      if (text) {
        if (opinion) text.textContent = 'Registrado';
        else if (timedOut) text.textContent = 'Tempo esgotado';
        else if (isCorrect) text.textContent = pts ? ('Correto!  +' + pts) : 'Correto!';
        else text.textContent = 'Incorreto';
      }
    }

    var explain = this.el.querySelector('[data-qs-explain]');
    if (explain && this.data.explanation) {
      explain.textContent = this.data.explanation;
      explain.classList.add('show', isCorrect ? 'is-ok' : 'is-nok');
    }

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
