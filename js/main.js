/**
 * Accordion: button + [hidden] panel, aria-expanded
 * Reveal: IntersectionObserver for .reveal (disabled when prefers-reduced-motion)
 */
(function () {
  "use strict";

  const accordionRoot = document.querySelector("[data-accordion]");
  if (accordionRoot) {
    const triggers = accordionRoot.querySelectorAll(".accordion__trigger");
    triggers.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const panelId = btn.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;
        if (!panel) return;

        const isOpen = btn.getAttribute("aria-expanded") === "true";
        const next = !isOpen;
        btn.setAttribute("aria-expanded", String(next));
        panel.hidden = !next;
      });
    });
  }

  const prefersReduced =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");

  if (prefersReduced) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  if (!("IntersectionObserver" in window) || revealEls.length === 0) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  const io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
  );

  revealEls.forEach(function (el) {
    io.observe(el);
  });
})();
