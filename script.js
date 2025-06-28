document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  const startScreen = document.getElementById('start-screen');
  const videoOverlay = document.getElementById('video-overlay');
  const introVideo = document.getElementById('intro-video');
  const soundToggle = document.getElementById('sound-toggle');
  const mainContent = document.getElementById('main-content');
  const butterfly = document.getElementById('butterfly'); // 🦋 butterfly

  // Start screen logic
  startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    videoOverlay.style.display = 'block';
    introVideo.load(); // Reload to avoid stuck playback
    introVideo.play();
  });

  // Sound toggle logic
  soundToggle.addEventListener('click', () => {
    introVideo.muted = !introVideo.muted;
    soundToggle.textContent = introVideo.muted ? '🔇' : '🔊';
  });

  // When video ends, reveal main content
  introVideo.addEventListener('ended', () => {
    videoOverlay.style.display = 'none';
    mainContent.style.display = 'block';
    butterfly.style.display = 'block';

    const allSections = document.querySelectorAll("section");
    allSections.forEach(section => {
      section.style.display = "block";
    });
  });

  // DANCE VIDEO MODAL LOGIC
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
    modalVideo.src = ""; // reset
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modalVideo.pause();
      modalVideo.src = "";
    }
  });
  const backToTop = document.getElementById("backToTop");
window.onscroll = () => {
  backToTop.style.display = window.scrollY > 400 ? "block" : "none";
};
backToTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

});
