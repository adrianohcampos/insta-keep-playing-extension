/**
 * InstaKeepPlaying — roda no MAIN world em document_start.
 * Sobrescreve a Page Visibility API e bloqueia eventos de perda de foco
 * antes do código nativo do Instagram carregar.
 */
(function () {
  'use strict';

  const alwaysVisible = () => 'visible';
  const alwaysFalse = () => false;

  try {
    Object.defineProperty(Document.prototype, 'hidden', {
      get: alwaysFalse,
      configurable: true,
    });
    Object.defineProperty(Document.prototype, 'webkitHidden', {
      get: alwaysFalse,
      configurable: true,
    });
    Object.defineProperty(Document.prototype, 'visibilityState', {
      get: alwaysVisible,
      configurable: true,
    });
    Object.defineProperty(Document.prototype, 'webkitVisibilityState', {
      get: alwaysVisible,
      configurable: true,
    });
  } catch (_) {
    // fallback se o prototype estiver selado
    try {
      Object.defineProperty(document, 'hidden', {
        get: alwaysFalse,
        configurable: true,
      });
      Object.defineProperty(document, 'visibilityState', {
        get: alwaysVisible,
        configurable: true,
      });
    } catch (__) {}
  }

  const BLOCKED = new Set(['visibilitychange', 'webkitvisibilitychange', 'blur', 'pagehide']);

  const stop = (event) => {
    if (!BLOCKED.has(event.type)) return;
    event.stopImmediatePropagation();
    event.stopPropagation();
  };

  // captura na fase de capture (true), como no teste do console
  BLOCKED.forEach((type) => {
    window.addEventListener(type, stop, true);
    document.addEventListener(type, stop, true);
  });

  // impede que o Instagram registre listeners reais nesses eventos
  const nativeAdd = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (BLOCKED.has(type)) return;
    return nativeAdd.call(this, type, listener, options);
  };
})();
