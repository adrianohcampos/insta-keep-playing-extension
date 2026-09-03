/**
 * Content script (isolated world). Se a opção estiver ativa,
 * injeta inject.js no MAIN world o mais cedo possível.
 */
(function () {
  'use strict';

  chrome.storage.local.get({ enabled: true }, ({ enabled }) => {
    if (enabled === false) return;

    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('inject.js');
    script.async = false;
    script.onload = () => script.remove();
    (document.documentElement || document.head).appendChild(script);
  });
})();
