const quitBtn = document.querySelector(".quit-btn");
const cancelAdBtn = document.getElementById("cancel-ad-btn");
quitBtn.addEventListener("click", () => {
  history.back();
});
const adVideo = document.getElementById("ad-video");

const modalFooter = document.querySelector(".modal-footer");

// Load the adLinks.json file
const fewCoinsAdBtn = document.getElementById("few-coinsAdBtn");
const watchAdBtns = document.querySelectorAll(".watch-ad");
const adModal = document.querySelector(".adModal");
const allHintsAdBtn = document.getElementById("allHintsAdBtn");
const oneLifeAdBtn = document.getElementById("oneLifeAdBtn");
const currentTimeDisplay = document.getElementById("currentTime");
const totalDurationDisplay = document.getElementById("totalDuration");
const progressBar = document.getElementById("progressBar");
const videoTimer = document.querySelector(".video-timer");
console.log(totalDurationDisplay);

// const currentTimeDisplay

watchAdBtns.forEach((watchAdBtn) => {
  watchAdBtn.addEventListener("click", () => {
    adModal.style.display = "block";
    fetch("../adLinks.json")
      .then((response) => response.json())
      .then((ads) => {
        let totalAdTime = 0; // Total time ads have played
        const maxAdTime = 60; // Maximum ad time in seconds
        const cancelTime = 40; // Time after which the cancel button appears
        let cancelButtonShown = false;

        // Function to show a random ad
        function showRandomAd() {
          let randomNumber = Math.floor(Math.random() * ads.length);
          const randomAd = ads[randomNumber];
          console.log(randomNumber);

          adVideo.src = randomAd.path; // Set the video source
          adVideo.load();
          adVideo.play(); // Play the video
        }

        // Function to start the ad sequence
        function startAdSequence() {
          totalAdTime = 0;
          cancelButtonShown = false;
          cancelAdBtn.style.display = "none"; // Hide the cancel button
          showRandomAd();
        }

        // Update the total duration when the video metadata is loaded
        adVideo.addEventListener("loadedmetadata", () => {
          console.log("meta data loaaded");
          const totalDuration = formatTime(adVideo.duration);
          totalDurationDisplay.textContent = totalDuration;
          progressBar.max = adVideo.duration; // Set the max value of the progress bar
        });

        // Update the current time and progress bar as the video plays
        adVideo.addEventListener("timeupdate", () => {
          const currentTime = formatTime(adVideo.currentTime);
          currentTimeDisplay.textContent = currentTime;
          progressBar.value = adVideo.currentTime; // Update the progress bar value
        });

        // Format time in MM:SS format
        function formatTime(seconds) {
          const minutes = Math.floor(seconds / 60);
          const secs = Math.floor(seconds % 60);
          return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
        }
        // Event listener for when an ad ends
        adVideo.addEventListener("ended", () => {
          if (totalAdTime < maxAdTime) {
            setTimeout(() => {
              showRandomAd(); // Play another random ad after 1 second
            }, 500); // 1-second delay
          } else {
            adModal.style.display = "none";
            alert("ad-ended! continue to game");
            adVideo.style.display = "none"; // Hide the video
            cancelAdBtn.style.display = "none"; // Hide the cancel button
            modalFooter.style.display = "none";
          }
        });

        // Timer to track ad playback time
        const adTimer = setInterval(() => {
          totalAdTime++;

          // Show the cancel button after 40 seconds
          if (totalAdTime >= cancelTime && !cancelButtonShown) {
            cancelAdBtn.style.display = "block";
            cancelButtonShown = true;
            modalFooter.style.display = "block";
          }

          // Stop the timer after 60 seconds
          if (totalAdTime >= maxAdTime) {
            clearInterval(adTimer);
          }
        }, 1000); // Increment every second

        // Event listener for the cancel button
        cancelAdBtn.addEventListener("click", () => {
          adModal.style.display = "none";
          adVideo.style.display = "none"; // Hide the video
          cancelAdBtn.style.display = "none"; // Hide the cancel button
          adVideo.pause();
          adVideo.src = "";
          modalFooter.style.display = "none";

          clearInterval(adTimer); // Stop the timer
        });
        modalFooter.addEventListener("click", () => {
          adModal.style.display = "none";
          adVideo.style.display = "none";
          adVideo.pause();
          adVideo.src = "";
          clearInterval(adTimer);
        });

        // Start the ad sequence
        startAdSequence();
      })
      .catch((error) => console.error("Error loading ads:", error));
  });
});
const playPauseOverlay = document.getElementById("play-pause-overlay");
const playPauseIcon = document.querySelector(".playPauseIcon");

playPauseIcon.addEventListener("click", togglePlayPause);
function togglePlayPause() {
  if (adVideo.paused || adVideo.ended) {
    adVideo.play();
    playPauseIcon.src = "../images/video-pause-button.png";
  } else {
    adVideo.pause();
    playPauseIcon.src = "../images/play-button-arrowhead.png";
  }
}

function toggleVideoElementShow() {
  if (playPauseOverlay.style.display === "none") {
    playPauseOverlay.style.display = "block";
    videoTimer.style.display = "block";
    setTimeout(() => {
      playPauseOverlay.style.display = "none";
      videoTimer.style.display = "none";
    }, 5000);
  } else {
    playPauseOverlay.style.display = "none";
    videoTimer.style.display = "none";
  }
}
adVideo.addEventListener("click", toggleVideoElementShow);
adVideo.addEventListener("dblclick", togglePlayPause);
