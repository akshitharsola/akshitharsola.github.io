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
  var soundBtn = document.getElementById("hero-sound");

  /* ---------- Hero video ---------- */
  function hideSkipIntro() {
    if (!skipIntro || skipIntro.hidden) return;
    var hadFocus = document.activeElement === skipIntro;
    skipIntro.hidden = true;
    if (soundBtn) soundBtn.hidden = true;
    if (hadFocus && heroTitle) heroTitle.focus();
  }

  function syncSoundBtn() {
    if (!soundBtn || !video) return;
    soundBtn.textContent = video.muted ? "Unmute" : "Mute";
    soundBtn.setAttribute("aria-pressed", video.muted ? "false" : "true");
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
    if (video.error || video.networkState === 3 /* NETWORK_NO_SOURCE */) {
      try { video.pause(); } catch (err) {}
      hideSkipIntro();
      return;
    }
    /* Always try with sound first. Browsers allow it after a gesture, or on sites where
       the visitor has often played media with sound; otherwise play() is refused below
       and the video restarts muted behind the Unmute button. */
    video.muted = false;
    video.loop = false;
    if (skipIntro) skipIntro.hidden = false;
    var p;
    try {
      p = video.play();
    } catch (e) {
      try { video.pause(); } catch (err) {}
      hideSkipIntro();
      return;
    }
    if (soundBtn) { soundBtn.hidden = false; syncSoundBtn(); }
    if (p && typeof p.catch === "function") {
      p.catch(function () {
        if (!video.muted) {
          /* Sound refused: retry muted before giving up. */
          video.muted = true;
          syncSoundBtn();
          var retry = video.play();
          if (retry && typeof retry.catch === "function") {
            retry.catch(function () {
              try { video.pause(); } catch (err) {}
              hideSkipIntro();
            });
          }
          return;
        }
        /* Autoplay refused or no playable source: the poster stays as the hero. */
        try { video.pause(); } catch (err) {}
        hideSkipIntro();
      });
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
  if (soundBtn && video) {
    soundBtn.addEventListener("click", function () {
      video.muted = !video.muted;
      syncSoundBtn();
    });
  }

  /* Hide/show the hero text so the video can be seen unobstructed (desktop only;
     on narrow screens the text sits below the frame). Click the video or the button. */
  var hero = document.querySelector(".hero");
  var heroToggle = document.getElementById("hero-toggle");
  var heroMedia = document.querySelector(".hero-media");
  function setTextHidden(hide) {
    if (!hero) return;
    hero.classList.toggle("text-hidden", hide);
    if (heroToggle) {
      heroToggle.textContent = hide ? "Show text" : "Hide text";
      heroToggle.setAttribute("aria-pressed", hide ? "true" : "false");
    }
  }
  if (hero && heroToggle && heroMedia) {
    heroToggle.hidden = false;
    heroToggle.addEventListener("click", function () {
      setTextHidden(!hero.classList.contains("text-hidden"));
    });
    heroMedia.addEventListener("click", function (e) {
      if (e.target.closest("button, a")) return;
      setTextHidden(!hero.classList.contains("text-hidden"));
    });
    if (video) video.addEventListener("ended", function () { setTextHidden(false); });
    if (skipIntro) skipIntro.addEventListener("click", function () { setTextHidden(false); });
  }

  /* ---------- Loader & Typewriter ---------- */
  var loader = document.getElementById("loader");
  var timers = [];
  var loaderFinished = false;

  function finishLoader() {
    if (loaderFinished) return;
    loaderFinished = true;
    while (timers.length) {
      clearTimeout(timers.pop());
    }
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

    // While loader is active, request preloading video
    if (video) {
      video.preload = "auto";
      if (video.networkState === 0 /* NETWORK_EMPTY */) {
        try { video.load(); } catch (e) {}
      }
    }

    var statusText = document.getElementById("loader-status-text");
    var loaderType = document.getElementById("loader-type");
    var skipLoader = document.getElementById("loader-skip");
    if (skipLoader) skipLoader.addEventListener("click", finishLoader);

    var videoReady = false;
    var armDone = false;
    var capHit = false;
    var typingStarted = false;

    var typingLines = [
      "Machine Learning · Robotics · Computer Vision",
      "Robot Learning | ROS 2 | LeRobot",
      "3x Published Researcher",
      "Seeking graduate roles in Ireland and the EU"
    ];

    function startTyping() {
      if (typingStarted || loaderFinished) return;
      typingStarted = true;

      if (statusText) statusText.textContent = "READY";
      loader.classList.add("is-ready");

      var lineIdx = 0;

      function typeCurrentLine() {
        if (loaderFinished) return;
        if (lineIdx >= typingLines.length) {
          loader.classList.add("is-done");
          timers.push(setTimeout(finishLoader, 300));
          return;
        }

        var text = typingLines[lineIdx];
        var charIdx = 0;
        // ~1100ms typing duration per line
        var charDelay = Math.max(12, Math.round(1100 / text.length));

        function typeChar() {
          if (loaderFinished) return;
          charIdx++;
          if (loaderType) loaderType.textContent = text.slice(0, charIdx);
          if (charIdx < text.length) {
            timers.push(setTimeout(typeChar, charDelay));
          } else {
            // Line typed completely. Pause 1100ms.
            if (lineIdx === typingLines.length - 1) {
              // Final line: pause 1100ms then fade out loader
              timers.push(setTimeout(function () {
                if (loaderFinished) return;
                loader.classList.add("is-done");
                timers.push(setTimeout(finishLoader, 300));
              }, 1100));
            } else {
              // Pause 1100ms then erase
              timers.push(setTimeout(function () {
                if (loaderFinished) return;
                eraseCurrentLine(text);
              }, 1100));
            }
          }
        }
        typeChar();
      }

      function eraseCurrentLine(text) {
        if (loaderFinished) return;
        var curLen = text.length;
        // Erase in ~250ms total
        var stepDelay = 15;
        var charsPerStep = Math.max(1, Math.ceil(text.length / (250 / stepDelay)));

        function eraseStep() {
          if (loaderFinished) return;
          curLen = Math.max(0, curLen - charsPerStep);
          if (loaderType) loaderType.textContent = text.slice(0, curLen);
          if (curLen > 0) {
            timers.push(setTimeout(eraseStep, stepDelay));
          } else {
            lineIdx++;
            timers.push(setTimeout(typeCurrentLine, 150));
          }
        }
        eraseStep();
      }

      typeCurrentLine();
    }

    function checkGate() {
      if (typingStarted || loaderFinished) return;
      if ((armDone && videoReady) || capHit) {
        startTyping();
      }
    }

    // Arm drawing completes in ~1050ms
    timers.push(setTimeout(function () {
      armDone = true;
      checkGate();
    }, 1050));

    // Hard cap at 4000ms from start
    timers.push(setTimeout(function () {
      capHit = true;
      checkGate();
    }, 4000));

    // Video readiness check
    if (video) {
      if (video.readyState >= 4) {
        videoReady = true;
        checkGate();
      } else {
        var onCanPlayThrough = function () {
          videoReady = true;
          video.removeEventListener("canplaythrough", onCanPlayThrough);
          checkGate();
        };
        video.addEventListener("canplaythrough", onCanPlayThrough);

        // Also if last source errors or video fails, mark videoReady so we don't stall for 4s
        var videoSources = video.querySelectorAll("source");
        var onVideoErr = function () {
          videoReady = true;
          checkGate();
        };
        if (videoSources.length) {
          videoSources[videoSources.length - 1].addEventListener("error", onVideoErr, { once: true });
        }
        video.addEventListener("error", onVideoErr, { once: true });
      }
    } else {
      videoReady = true;
      checkGate();
    }
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
