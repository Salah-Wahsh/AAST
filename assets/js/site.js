(function () {
  /** Inline template so the nav works from disk (file://) and on GitHub Pages — no fetch(). */
  function buildNavTemplate() {
    var active = document.body && document.body.dataset.navActive;
    var isHome = active === "home";
    var brandClass = "site-nav__brand" + (isHome ? "" : " site-nav__brand--back");
    var brandLabel = isHome ? "AAST Labs" : "\u2190 Back";
    var brandExtra = isHome
      ? ""
      : ' aria-label="Back to all labs"';

    return (
      '<nav class="site-nav" aria-label="Primary">' +
      '<div class="site-nav__inner">' +
      '<a class="' +
      brandClass +
      '" data-site-href="index.html" data-nav-id="home"' +
      brandExtra +
      ">" +
      brandLabel +
      "</a>" +
      '<a class="site-nav__logo-link" href="https://aast.edu/" target="_blank" rel="noopener noreferrer" aria-label="Arab Academy for Science, Technology and Maritime Transport (opens in new tab)">' +
      '<img class="site-nav__logo" src="https://aast.edu/template/en/colleges-all/img/logo-blue03.webp" alt="" width="240" height="64" decoding="async" />' +
      "</a>" +
      "</div>" +
      "</nav>"
    );
  }

  function getScript() {
    return document.querySelector('script[data-site-root][src*="site.js"]');
  }

  function siteBase() {
    var s = getScript();
    var raw = (s && s.dataset && s.dataset.siteRoot) || ".";
    return String(raw).trim() || ".";
  }

  function resolveHref(pathFromRoot) {
    var base = siteBase().replace(/\/$/, "");
    if (base === "." || base === "") {
      return "./" + pathFromRoot.replace(/^\.\//, "");
    }
    return base + "/" + pathFromRoot;
  }

  function wireNavLinks(navRoot) {
    navRoot.querySelectorAll("[data-site-href]").forEach(function (el) {
      var p = el.getAttribute("data-site-href");
      if (!p) return;
      el.setAttribute("href", resolveHref(p));
      el.removeAttribute("data-site-href");
    });

    var active = document.body && document.body.dataset.navActive;
    if (!active) return;
    var link = navRoot.querySelector('[data-nav-id="' + active + '"]');
    if (link) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  }

  function injectNav() {
    var mount = document.querySelector("[data-site-nav]");
    if (!mount) return;
    mount.innerHTML = buildNavTemplate();
    wireNavLinks(mount);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectNav);
  } else {
    injectNav();
  }
})();
