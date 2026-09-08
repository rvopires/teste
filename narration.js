/**
 * Narração (TTS) — lê em voz alta o conteúdo da tela atual.
 *
 * COMO FUNCIONA
 * O navegador NÃO chama a API. Ele apenas toca um mp3 já gravado em
 * assets/audio/. Os arquivos são gerados uma única vez pelo generate-audios.js
 * (script de terminal), que é quem fala com o endpoint da TecnoCursos.
 *
 * Vantagem: nenhum token no navegador, nada é gerado duas vezes, toca na hora
 * e funciona offline.
 *
 * Para gerar/atualizar os áudios, veja as instruções no generate-audios.js.
 *
 * Fase atual: ligado na abertura e na capa do Módulo 1 (CONFIG.enabledPages).
 * Para liberar em todas as telas, troque o array por null.
 */
(function (global) {
  'use strict';

  var CONFIG = {
    audioDir: 'assets/audio/',

    // espera curta: vários eventos juntos viram uma chamada só
    debounceMs: 300,

    // chaves de página com narração ligada; null = todas
    enabledPages: ['home', 'm1-cover']
  };

  var T = global.NarrationText;

  var state = {
    getState: null,   // função da página: devolve { screen, page, total, mode }
    audio: null,
    playId: 0,
    timer: null,
    button: null
  };

  /* ── Estado atual ──────────────────────────────────────────────────── */

  function readState() {
    return typeof state.getState === 'function' ? state.getState() : null;
  }

  // identifica a tela: 'home' na abertura, o id da tela nos módulos
  function getPageKey() {
    var st = readState();
    if (!st) return '';
    if (st.mode === 'home') return T.HOME_KEY;
    return (st.screen && st.screen.id) || '';
  }

  function getPageLabel() {
    var st = readState();
    if (!st || st.mode === 'home') return '';
    return T.pageLabel(st.page, st.total);
  }

  // o mesmo texto que o generate-audios.js usou para gravar o mp3
  function getCurrentNarrationText() {
    var st = readState();
    if (!st) return '';
    if (st.mode === 'home') return T.buildHomeText();
    return T.buildScreenText(st.screen, st.page, st.total);
  }

  function getAudioUrl(key) {
    return CONFIG.audioDir + T.audioFileName(key);
  }

  /* ── Áudio ─────────────────────────────────────────────────────────── */

  function setSpeaking(on) {
    if (state.button) state.button.classList.toggle('is-speaking', !!on);
  }

  function stopSpeech() {
    clearTimeout(state.timer);
    state.timer = null;
    state.playId++;
    if (state.audio) {
      try { state.audio.pause(); } catch (e) {}
      state.audio.src = '';
      state.audio = null;
    }
    setSpeaking(false);
  }

  function isPlaying() {
    return !!state.audio;
  }

  // inclui a espera do debounce: entre o clique e o som, já conta como ligado
  function isActive() {
    return !!state.audio || !!state.timer;
  }

  function isEnabled() {
    var key = getPageKey();
    if (!key) return false;
    if (!CONFIG.enabledPages) return true;
    return CONFIG.enabledPages.indexOf(key) !== -1;
  }

  // toca o mp3 da pasta; se não existir, avisa no console e segue a vida
  function playPageAudio(key) {
    var url = getAudioUrl(key);
    var id = ++state.playId;
    setSpeaking(true);

    var audio = new Audio(url);
    state.audio = audio;

    audio.addEventListener('ended', function () {
      if (id === state.playId) stopSpeech();
    }, { once: true });

    return audio.play()
      .then(function () { return true; })
      .catch(function () {
        console.warn(
          '[narração] áudio não encontrado: ' + url +
          ' — rode "node generate-audios.js" para gerar.'
        );
        if (id === state.playId) stopSpeech();
        return false;
      });
  }

  /* ── Controle ──────────────────────────────────────────────────────── */

  function speakCurrent() {
    clearTimeout(state.timer);
    state.timer = null;
    if (!isEnabled()) return;
    var key = getPageKey();
    setSpeaking(true);
    state.timer = setTimeout(function () {
      state.timer = null;
      playPageAudio(key);
    }, CONFIG.debounceMs);
  }

  // clicar de novo durante a fala reinicia do começo
  function replay() {
    stopSpeech();
    speakCurrent();
  }

  function bindNarrationEvents(opts) {
    opts = opts || {};
    if (typeof opts.getState === 'function') state.getState = opts.getState;
    if (opts.button) state.button = opts.button;
  }

  global.Narration = {
    config: CONFIG,
    bindNarrationEvents: bindNarrationEvents,
    getPageKey: getPageKey,
    getPageLabel: getPageLabel,
    getCurrentNarrationText: getCurrentNarrationText,
    getAudioUrl: getAudioUrl,
    speakCurrent: speakCurrent,
    replay: replay,
    stopSpeech: stopSpeech,
    isPlaying: isPlaying,
    isActive: isActive,
    isEnabled: isEnabled
  };
})(window);
