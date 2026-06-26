/* Perth Contractor Agency */
(function () {
  "use strict";

  // Footer year
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".header__nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Scroll reveal
  var targets = document.querySelectorAll(
    ".section-head, .port-card, .review-card, .sol-panel, .story-card, .faq-item, .about__text, .about__image, .million-stat, .million-display, .how-banner, .contact-intro, .contact-form"
  );
  targets.forEach(function (el) { el.setAttribute("data-reveal", ""); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("visible"); });
  }

  // Reviews slider (mobile: step through cards; desktop shows all 3)
  var track = document.getElementById("reviews-track");
  if (track) {
    var cards = Array.prototype.slice.call(track.children);
    var idx = 0;
    function showReviews() {
      var mobile = window.matchMedia("(max-width: 640px)").matches;
      cards.forEach(function (c, i) {
        c.style.display = mobile ? (i === idx ? "flex" : "none") : "flex";
      });
    }
    document.querySelectorAll("[data-slide]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var dir = btn.getAttribute("data-slide") === "next" ? 1 : -1;
        idx = (idx + dir + cards.length) % cards.length;
        showReviews();
      });
    });
    window.addEventListener("resize", showReviews);
    showReviews();
  }

  // Contact form
  var form = document.getElementById("lead-form");
  if (form) {
    var statusEl = form.querySelector(".form-status");
    var submitBtn = form.querySelector("[type='submit']");
    form.addEventListener("submit", function (e) {
      if (form.querySelector('[name="_gotcha"]').value) { e.preventDefault(); return; }
      if (!form.checkValidity()) return;
      if (form.getAttribute("action").indexOf("your-form-id") !== -1) {
        e.preventDefault();
        statusEl.textContent = "✅ Thanks! Connect this form to Formspree or Netlify to start receiving enquiries.";
        statusEl.className = "form-status is-success";
        statusEl.hidden = false;
        form.reset();
        return;
      }
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.textContent = "SENDING…";
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (res) {
          if (res.ok) {
            statusEl.textContent = "✅ Thanks! We'll be in touch shortly.";
            statusEl.className = "form-status is-success";
            form.reset();
          } else {
            statusEl.textContent = "⚠️ Something went wrong. Please call +61 8 6555 0123.";
            statusEl.className = "form-status is-error";
          }
          statusEl.hidden = false;
        })
        .catch(function () {
          statusEl.textContent = "⚠️ Network error. Please call +61 8 6555 0123.";
          statusEl.className = "form-status is-error";
          statusEl.hidden = false;
        })
        .finally(function () { submitBtn.disabled = false; submitBtn.textContent = "SEND MY ENQUIRY"; });
    });
  }
})();
