/* Perth Contractor Agency — interactions */
(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Testimonials slider (rotates the 3-up track on mobile / via arrows)
  var slider = document.querySelector("[data-slider]");
  if (slider) {
    var track = slider.querySelector(".slider__track");
    var reviews = Array.prototype.slice.call(track.children);
    var index = 0;

    function render() {
      var perView = window.matchMedia("(max-width: 900px)").matches ? 1 : reviews.length;
      reviews.forEach(function (r, i) {
        var visible = i >= index && i < index + perView;
        r.style.display = visible ? "flex" : (perView === reviews.length ? "flex" : "none");
      });
    }

    function move(dir) {
      var perView = window.matchMedia("(max-width: 900px)").matches ? 1 : reviews.length;
      index = (index + dir + reviews.length) % reviews.length;
      if (perView === reviews.length) index = 0; // desktop shows all
      render();
    }

    slider.querySelector(".slider__nav--prev").addEventListener("click", function () { move(-1); });
    slider.querySelector(".slider__nav--next").addEventListener("click", function () { move(1); });
    window.addEventListener("resize", render);
    render();
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll(
    ".section__head, .card-shot, .panel, .review, .story, .faq__item, .about__copy, .stat-banner"
  );
  revealEls.forEach(function (el) { el.setAttribute("data-reveal", ""); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
