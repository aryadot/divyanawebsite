document.addEventListener('DOMContentLoaded', () => {
  // 🌟 Start Screen Logic
  const startButton = document.getElementById('start-button');
  const startScreen = document.getElementById('start-screen');
  const videoOverlay = document.getElementById('video-overlay');
  const introVideo = document.getElementById('intro-video');
  const soundToggle = document.getElementById('sound-toggle');
  const mainContent = document.getElementById('main-content');
  const butterfly = document.getElementById('butterfly');
  const navLinks = document.querySelectorAll('.top-toggle a');

  function stopIntroAndReveal() {
    if (!introVideo.paused) {
      introVideo.pause();
      introVideo.currentTime = 0;
    }
    videoOverlay.style.display = 'none';
    startScreen.style.display = 'none';
    mainContent.style.display = 'block';
    butterfly.style.display = 'block';

    // Ensure all sections are visible even if CSS had them hidden
    document.querySelectorAll('section').forEach(s => s.style.display = 'block');
  }
  startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    videoOverlay.style.display = 'block';
    introVideo.load();
    introVideo.play().catch(() => {
  introVideo.muted = true;
  introVideo.play();
});
  });

  soundToggle.addEventListener('click', () => {
    introVideo.muted = !introVideo.muted;
    soundToggle.textContent = introVideo.muted ? '🔇' : '🔊';
  });

    // ⏱ When video ends naturally
  introVideo.addEventListener('ended', stopIntroAndReveal);
  // 🧭 If user clicks any nav tab mid-intro, stop video and jump
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href'); // e.g. "#certifications" or "blog.html"
      const isAnchor = href && href.startsWith('#');

      // Always stop and reveal content first
      stopIntroAndReveal();

      if (isAnchor) {
        e.preventDefault(); // we'll scroll ourselves
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      // If it's a page nav like blog.html, let it proceed normally (no preventDefault)
    });
  });

  // 🔗 If page loads with a hash (e.g. /index.html#certifications), skip intro automatically
  if (window.location.hash) {
    stopIntroAndReveal();
    const target = document.querySelector(window.location.hash);
    if (target) {
      // slight delay so layout is ready
      setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
    }
  }



  // 💃 Dance Modal Viewer
  const danceThumbs = document.querySelectorAll(".dance-thumb video");
  const modal = document.getElementById("dance-modal");
  const modalVideo = document.getElementById("modal-video");
  const closeBtn = document.querySelector(".close-btn");

  danceThumbs.forEach(video => {
    video.addEventListener("click", () => {
      modal.style.display = "flex";
      modalVideo.src = video.src;
      modalVideo.play();
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    modalVideo.pause();
    modalVideo.src = "";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modalVideo.pause();
      modalVideo.src = "";
    }
  });

  // 🔝 Back to Top Button
  const backToTop = document.getElementById("backToTop");
  window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 400 ? "block" : "none";
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  
});
