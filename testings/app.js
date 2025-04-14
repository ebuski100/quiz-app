const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioBuffer = null;

document.getElementById("audioFile").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function () {
    audioContext.decodeAudioData(reader.result, (buffer) => {
      audioBuffer = buffer;
      console.log("Audio loaded and decoded.");
    });
  };
  reader.readAsArrayBuffer(file);
});

document.getElementById("play").addEventListener("click", () => {
  if (!audioBuffer) return;

  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;

  // Trim: Start at 2 seconds, play for 3 seconds
  const startAt = 2;
  const duration = 1;

  source.connect(audioContext.destination);
  source.start(0, startAt, duration);
});

const celebrationContainer = document.querySelector(".celebration-container");
// const celebrateButton = document.getElementById("celebrate-button");

// celebrateButton.addEventListener("click", () => {
//   for (let i = 0; i < 50; i++) {
//     const confetti = document.createElement("div");
//     confetti.classList.add("confetti");
//     confetti.style.left = `${Math.random() * 100}vw`;
//     confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
//     celebrationContainer.appendChild(confetti);

//     // Remove confetti after animation
//     setTimeout(() => {
//       confetti.remove();
//     }, 2000);
//   }
// });

const celebrateButton = document.getElementById("celebrate-button");

celebrateButton.addEventListener("click", () => {
  confetti({
    particleCount: 200,
    spread: 500,
    origin: { x: 0.5, y: 0.5 },
  });
});
