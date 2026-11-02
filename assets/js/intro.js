/* Home page intro: loader timeline, one-shot hero video, scroll reveals.
   Plain JS, no libraries. Every step fails safe: content is visible without it. */
(function () {
  "use strict";

  var doc = document.documentElement;
  var reduceMotion = false;
  try {
    reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {}

  var video = document.getElementById("hero-video");
  var skipIntro = document.getElementById("hero-skip");
  var heroTitle = document.getElementById("hero-title");

  /* ---------- Hero video ---------- */
  function hideSkipIntro() {
    if (!skipIntro || skipIntro.hidden) return;
    var hadFocus = document.activeElement === skipIntro;
    skipIntro.hidden = true;
    if (hadFocus && heroTitle) heroTitle.focus();
  }

  function holdFinalFrame() {
    if (!video) return;
    var seek = function () {
      video.pause();
      if (isFinite(video.duration) && video.duration > 0) {
        video.currentTime = Math.max(0, video.duration - 0.05);
      }
    };
    if (video.readyState >= 1) seek();
    else video.addEventListener("loadedmetadata", seek, { once: true });
    hideSkipIntro();
  }

  function playVideo() {
    if (!video || reduceMotion) return;
    video.muted = true;
    video.loop = false;
    if (skipIntro) skipIntro.hidden = false;
    var p;
    try {
      p = video.play();
    } catch (e) {
      hideSkipIntro();
      return;
    }
    if (p && typeof p.catch === "function") {
      /* Autoplay refused or no playable source: the poster stays as the hero. */
      p.catch(function () { hideSkipIntro(); });
    }
  }

  if (video) {
    video.addEventListener("ended", hideSkipIntro);
    /* Skipped sources (e.g. a media query that does not match) also fire "error",
       so only a failure of the last source means there is no playable video. */
    var sources = video.querySelectorAll("source");
    if (sources.length) sources[sources.length - 1].addEventListener("error", hideSkipIntro);
  }
  if (skipIntro) skipIntro.addEventListener("click", holdFinalFrame);

  /* ---------- Loader ---------- */
  var loader = document.getElementById("loader");
  var timers = [];
  var loaderFinished = false;

  function finishLoader() {
    if (loaderFinished) return;
    loaderFinished = true;
    timers.forEach(clearTimeout);
    var hadFocus = loader && loader.contains(document.activeElement);
    doc.classList.remove("loader-active");
    if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
    playVideo();
    if (hadFocus) {
      if (skipIntro && !skipIntro.hidden) skipIntro.focus();
      else if (heroTitle) heroTitle.focus();
    }
  }

  if (loader && doc.classList.contains("loader-active") && !reduceMotion) {
    try { window.sessionStorage.setItem("intro-seen", "1"); } catch (e) {}
    var statusText = document.getElementById("loader-status-text");
    var skipLoader = document.getElementById("loader-skip");
    if (skipLoader) skipLoader.addEventListener("click", finishLoader);
    timers.push(setTimeout(function () {
      if (statusText) statusText.textContent = "READY";
      loader.classList.add("is-ready");
    }, 1000));
    timers.push(setTimeout(function () { loader.classList.add("is-done"); }, 1200));
    timers.push(setTimeout(finishLoader, 1500));
  } else {
    doc.classList.remove("loader-active");
    if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
    playVideo();
  }

  /* ---------- Scroll reveal ---------- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    var items = document.querySelectorAll(".reveal");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    doc.classList.add("reveal-ready");
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }
})();
