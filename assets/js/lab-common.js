(function () {
  window.SiteLabs = window.SiteLabs || {};

  SiteLabs.toggleNav = function () {
    var sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.classList.toggle("open");
  };

  SiteLabs.toggleAnswer = function (id, btn) {
    var block = document.getElementById(id);
    if (!block || !btn) return;
    var isVisible = block.classList.contains("visible");
    if (isVisible) {
      block.classList.remove("visible");
      btn.textContent = "▶ Show Answer";
      btn.classList.remove("revealed");
    } else {
      block.classList.add("visible");
      btn.textContent = "▼ Hide Answer";
      btn.classList.add("revealed");
      if (window.Prism && typeof Prism.highlightAllUnder === "function") {
        Prism.highlightAllUnder(block);
      }
    }
  };

  SiteLabs.buildTocFromContent = function (contentSelector, sidebarSelector) {
    var content = document.querySelector(contentSelector);
    var sidebar = document.querySelector(sidebarSelector);
    if (!content || !sidebar) return;

    var headings = content.querySelectorAll("h1, h2, h3");
    var navHTML =
      '<p class="sidebar__label">On this page</p><hr class="sidebar__rule" />';

    headings.forEach(function (h, i) {
      h.id = "heading-" + i;
      var level = h.tagName === "H1" ? "1" : h.tagName === "H2" ? "2" : "3";
      navHTML +=
        '<a class="sidebar__link sidebar__link--level-' +
        level +
        '" href="#heading-' +
        i +
        '">' +
        h.textContent +
        "</a>";
    });

    sidebar.innerHTML = navHTML;
  };
})();
