/**
 * QuestionScreen — componente reutilizável (vanilla JS)
 *
 * Tipos (JSON) — tudo DENTRO do cartão:
 *  - cover:    { type, title, subtitle?, image? }
 *  - content:  { type, kicker?, title, body?, bullets?, image? }
 *  - video:    { type, title, kicker?, duration?, scene?, brief?, video?, youtube?, image?/poster? }
 *  - image:    { type, title, kicker?, body?, bullets?, image, imageFit? }
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

    var hasLive = !!live;
    if (hasLive) {
      return `
      <article class="qs-screen is-video has-player" data-qs-root data-type="video" data-external-continue="1">
        <header class="qs-video-head">
          <span class="qs-video-pill">${esc(data.kicker || '🎥 Vídeo')}</span>
          <h2 class="qs-video-title">${esc(data.title || '')}</h2>
        </header>
        <div class="qs-media qs-media-video">
          ${stage}
        </div>
      </article>`;
    }

    return `
      <article class="qs-screen is-video" data-qs-root data-type="video">
        <div class="qs-media qs-media-video">
          ${stage}
        </div>
        <div class="qs-panel qs-panel-tight">
          ${data.kicker ? `<div class="qs-kicker">${esc(data.kicker)}</div>` : '<div class="qs-kicker">🎥 Vídeo</div>'}
          <h2 class="qs-title">${esc(data.title || '')}</h2>
        </div>
        <div class="qs-foot">
          <div class="qs-actions">
            <button type="button" class="qs-btn" data-qs-continue>Continuar</button>
          </div>
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
      <article class="qs-screen is-image" data-qs-root data-type="image">
        <div class="qs-media qs-media-lg">
          ${mediaHTML(data, { contain: true })}
        </div>
        <div class="qs-panel qs-panel-tight">
          ${data.kicker ? `<div class="qs-kicker">${esc(data.kicker)}</div>` : ''}
          <h2 class="qs-title">${esc(data.title || '')}</h2>
          ${body}
          ${bullets}
        </div>
        <div class="qs-foot">
          <div class="qs-actions">
            <button type="button" class="qs-btn" data-qs-continue>Continuar</button>
          </div>
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
        <div class="qs-foot qs-foot-cover">
          <div class="qs-actions">
            <button type="button" class="qs-btn" data-qs-continue>Continuar</button>
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
      <article class="qs-screen is-content" data-qs-root data-type="content">
        <div class="qs-media ${hasImg ? 'qs-media-md' : 'qs-media-sm'}">
          ${mediaHTML(data)}
        </div>
        <div class="qs-panel">
          ${data.kicker ? `<div class="qs-kicker">${esc(data.kicker)}</div>` : ''}
          <h2 class="qs-title">${esc(data.title || '')}</h2>
          ${body}
          ${bullets}
        </div>
        <div class="qs-foot">
          <div class="qs-actions">
            <button type="button" class="qs-btn" data-qs-continue>Continuar</button>
          </div>
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
      <article class="qs-screen" data-qs-root data-type="question">
        <div class="qs-media qs-media-sm">
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
        <div class="qs-foot">
          <div class="qs-explain" data-qs-explain></div>
          <div class="qs-actions">
            <button type="button" class="qs-btn" data-qs-continue disabled>Continuar</button>
          </div>
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

    this.el.innerHTML = html;
    this.root = this.el.querySelector('[data-qs-root]');
    this.el.removeEventListener('click', this._onClick);
    this.el.addEventListener('click', this._onClick);

    if (type !== 'question') this.state.answered = true;

    if (type === 'video' && (this.data.embed || this.data.panda || this.data.youtube || this.data.video)) {
      this._bindVideoTags();
    }

    if (typeof this.options.onRender === 'function') {
      this.options.onRender(this.data, this);
    }
  };

  QuestionScreen.prototype._hideVideoTags = function () {
    var tags = this.el.querySelector('[data-qs-video-tags]');
    if (tags) tags.classList.add('is-hidden');
  };

  QuestionScreen.prototype._bindVideoTags = function () {
    var self = this;
    var root = this.el;
    var native = root.querySelector('video.qs-player');
    var iframe = root.querySelector('iframe[data-qs-panda]');

    function hide() { self._hideVideoTags(); }

    if (native) {
      native.addEventListener('play', hide, { once: true });
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
      if (msg === 'panda_play' || msg.indexOf('panda_play') !== -1 || msg === 'play' || msg === 'playing') {
        hide();
      }
    };
    window.addEventListener('message', this._onVideoMsg);

    if (iframe && iframe.id) {
      this._ensurePandaApi(iframe.id, hide);
    }
  };

  QuestionScreen.prototype._ensurePandaApi = function (iframeId, onPlay) {
    var API = 'https://player.pandavideo.com.br/api.v2.js';
    function bind() {
      try {
        if (typeof PandaPlayer === 'undefined') return;
        var player = new PandaPlayer(iframeId, {
          onReady: function () {
            try {
              player.onEvent(function (e) {
                if (e && e.message === 'panda_play') onPlay();
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
    var cont = e.target.closest('[data-qs-continue]');
    if (opt && !this.state.answered) {
      this.select(+opt.dataset.index);
      return;
    }
    if (cont && !cont.disabled) {
      if (typeof this.options.onContinue === 'function') {
        this.options.onContinue({
          correct: this.state.correct,
          selectedIndex: this.state.selectedIndex,
          data: this.data
        });
      }
    }
  };

  QuestionScreen.prototype.select = function (index) {
    if (this.state.answered) return;
    var alts = this.data.alternatives || [];
    if (index < 0 || index >= alts.length) return;

    this.state.answered = true;
    this.state.selectedIndex = index;
    var opinion = !!this.data.opinion;
    var chosen = alts[index];
    var correctIndex = alts.findIndex(function (a) { return !!a.correct; });
    var isCorrect = opinion ? true : !!(chosen && chosen.correct);
    this.state.correct = isCorrect;

    var buttons = this.el.querySelectorAll('.qs-opt');
    buttons.forEach(function (btn, i) {
      btn.disabled = true;
      btn.classList.add('is-revealed');
      if (i === index) btn.classList.add('is-selected');
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
      } else if (i === index) {
        btn.classList.add('is-wrong');
        btn.querySelector('.qs-mark').textContent = '✕';
      } else {
        btn.classList.add('is-dim');
      }
    });

    var ribbon = this.el.querySelector('[data-qs-ribbon]');
    if (ribbon) {
      ribbon.classList.add('show', isCorrect ? 'ok' : 'nok');
      var icon = ribbon.querySelector('[data-qs-ribbon-icon]');
      var text = ribbon.querySelector('[data-qs-ribbon-text]');
      if (icon) icon.textContent = isCorrect ? '✓' : '✕';
      if (text) text.textContent = opinion ? 'Registrado' : (isCorrect ? 'Correto' : 'Incorreto');
    }

    var explain = this.el.querySelector('[data-qs-explain]');
    if (explain && this.data.explanation) {
      explain.textContent = this.data.explanation;
      explain.classList.add('show', isCorrect ? 'is-ok' : 'is-nok');
    }

    var btn = this.el.querySelector('[data-qs-continue]');
    if (btn) btn.disabled = false;

    if (typeof this.options.onSelect === 'function') {
      this.options.onSelect({
        correct: isCorrect,
        selectedIndex: index,
        data: this.data
      });
    }
  };

  QuestionScreen.prototype.destroy = function () {
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
