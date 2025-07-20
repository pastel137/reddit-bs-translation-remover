// ==UserScript==
// @name         Reddit Auto-Translation Remover
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Redirects to original English reddit posts (removes ?tl=pl/de/fr etc. and forces original)
// @author       Pastel137
// @match        *://*.reddit.com/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    function cleanAndReloadURL() {
        let url = new URL(window.location.href);
        if (url.searchParams.has('tl')) {
            url.searchParams.delete('tl');
            url.searchParams.set('show', 'original');
            // Wymuszenie przeładowania z nowym URLem
            window.location.replace(url.toString());
        }
    }

    cleanAndReloadURL();

    // Obsługa nawigacji wewnętrznej bez pełnego reloadu
    const origPushState = history.pushState;
    history.pushState = function () {
        origPushState.apply(this, arguments);
        cleanAndReloadURL();
    };

    window.addEventListener('popstate', cleanAndReloadURL);
})();
