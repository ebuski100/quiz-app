const question = document.querySelector(".question");
const options = document.querySelectorAll(".option-text");
const storeBtns = document.querySelectorAll(".storeBtn");
const quitBtn = document.querySelector(".quit-btn");
const optionBoxes = document.querySelectorAll(".option");
const backgroundChange = document.querySelectorAll(".backgroundChange");
const timerShow = document.querySelector(".timer-show");

const questNumColors = document.querySelectorAll(".questionNum");

const resultMessage = document.querySelector(".resultMessage");
const congratulationsModal = document.querySelector(".congratulationsModal");
const priceTag = document.querySelector(".price-tag");
const playPauseOverlay = document.getElementById("play-pause-overlay");
const playPauseIcon = document.querySelector(".playPauseIcon");
const timeUpCloseBtn = document.querySelector(".timeUpCloseBtn");
const timeUpModal = document.querySelector(".time-upModal");
const timeUpModalCont = document.querySelector(".time-upModalContainer");
const adModalFooter = document.querySelector(".adModal-footer");
const timeUpFooter = document.querySelector(".timeUpModalFooter");
const modalPriceWon = document.querySelector(".price-won");
const leaveBtn = document.querySelector(".LeaveBtn");
const playAgain = document.querySelector(".playAgain");
const adModal = document.querySelector(".adModal");
const adVideo = document.getElementById("ad-video");
const cancelAdBtn = document.getElementById("cancel-ad-btn");
const currentTimeDisplay = document.getElementById("currentTime");
const totalDurationDisplay = document.getElementById("totalDuration");
const progressBar = document.getElementById("progressBar");
const videoTimer = document.querySelector(".video-timer");
const watchAdBtn = document.querySelector(".timeUpWatchAd");
const priceAmounts = [
  "#1,000,000",
  "#500,000",
  "#250,000",
  "#100,000",
  "#50,000",
  "#25,000",
  "#15,000",
  "#12,500",
  "#10,000",
  "#7,500",
  "#5,000",
  "#3,000",
  "#2,000",
  "#1,000",
  "#500",
];

// Retrieve the current price and index from localStorage
const currentPrice = localStorage.getItem("currentPrice") || "#500";
const currentPriceIndex =
  parseInt(localStorage.getItem("currentPriceIndex")) || priceAmounts.length;

const currentQuestionIndex =
  parseInt(localStorage.getItem("currentQuestionIndex")) || 0;

priceTag.textContent = currentPrice;

if (!localStorage.getItem("questionStates")) {
  localStorage.setItem("questionStates", JSON.stringify([]));
}

function checkForGameCompletion() {
  if (currentQuestionIndex >= questNumColors.length) {
    modalPriceWon.textContent = priceTag.textContent;
    congratulationsModal.style.display = "block";
  }
}

function reducePriceOnFailure() {
  const currentPriceIndex = priceAmounts.indexOf(priceTag.textContent);

  if (currentPriceIndex > 0) {
    priceTag.classList.add("blink-red");

    setTimeout(() => {
      priceTag.classList.remove("blink-red");
      if (currentQuestionIndex >= questNumColors.length) {
        checkForGameCompletion();
        resetOnGameEnd();
      } else {
        localStorage.setItem("currentQuestionIndex", currentQuestionIndex + 1);
      }

      for (i = 0; i < priceAmounts.length; i++) {
        priceTag.textContent = priceAmounts[currentPriceIndex + 1];
      }
      if (currentPriceIndex < priceAmounts.length - 1) {
        localStorage.setItem("currentPrice", priceTag.textContent);
      } else {
        localStorage.setItem("currentPrice", "#500");
      }

      if (currentPriceIndex < questNumColors.length) {
        localStorage.setItem("currentPriceIndex", currentPriceIndex + 1);
      }
      setTimeout(() => {
        priceTag.classList.remove("slide-in");
      }, 500);
    }, 1500);
  }
}
function increasePriceOnSuccess() {
  if (currentPriceIndex < priceAmounts.length) {
    priceTag.classList.add("blink-green");
    setTimeout(() => {
      if (currentQuestionIndex >= questNumColors.length) {
        checkForGameCompletion();
        resetOnGameEnd();
      } else {
        localStorage.setItem("currentQuestionIndex", currentQuestionIndex + 1);
      }
      priceTag.classList.remove("blink-green");
      localStorage.setItem("currentPriceIndex", currentPriceIndex - 1);
      priceTag.textContent = priceAmounts[currentPriceIndex - 1];
      localStorage.setItem("currentPrice", priceTag.textContent);
      setTimeout(() => {
        priceTag.classList.remove("slide-in");
      }, 500);
    }, 1500);
  }
}

function updateQuestionNumColors(currentQuestionIndex, isCorrect) {
  let questionStates = JSON.parse(localStorage.getItem("questionStates")) || [];

  questionStates[currentQuestionIndex] = isCorrect ? "correct" : "incorrect";

  localStorage.setItem("questionStates", JSON.stringify(questionStates));

  questNumColors.forEach((questNumColor, index) => {
    if (index < currentQuestionIndex) {
      questNumColor.style.backgroundColor =
        questionStates[index] === "correct" ? "green" : "red";
    } else if (index === currentQuestionIndex) {
      questNumColor.style.backgroundColor = "orange";
    } else {
      questNumColor.style.backgroundColor = "white";
    }
  });
}

function restoreQuestionNumColors(currentQuestionIndex) {
  let questionStates = JSON.parse(localStorage.getItem("questionStates")) || [];

  questNumColors.forEach((questNumColor, index) => {
    if (index < currentQuestionIndex) {
      questNumColor.style.backgroundColor =
        questionStates[index] === "correct" ? "green" : "red";
    } else if (index === currentQuestionIndex) {
      questNumColor.style.backgroundColor = "orange";
    } else {
      questNumColor.style.backgroundColor = "white";
    }
  });
}

// Call the restore function when the page loads
document.addEventListener("DOMContentLoaded", () => {
  restoreQuestionNumColors();
});

setTimeout(() => {
  // Clear the content first
  priceTag.textContent = "";

  // Animate the content character by character
  let index = 0;
  const interval = setInterval(() => {
    if (index < currentPrice.length) {
      priceTag.textContent += currentPrice[index]; // Add one character at a time
      index++;
    } else {
      clearInterval(interval); // Stop the animation when done
    }
  }, 100); // Adjust the speed (100ms per character)
}, 500);
const url = "https://opentdb.com/api.php?amount=1&type=multiple";

fetch(url)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    question.textContent = data.results[0].question;
    const incorrectAnswers = data.results[0].incorrect_answers;
    const correctAnswer = data.results[0].correct_answer;
    incorrectAnswers.push(correctAnswer);
    const shuffledAnswers = incorrectAnswers.sort(() => Math.random() - 0.5);

    console.log("Correct Answer:", correctAnswer);
    console.log("Shuffled Answers:", shuffledAnswers);

    options.forEach((option, i) => {
      option.textContent = shuffledAnswers[i];
      option.parentElement.addEventListener("click", () => {
        const isCorrect = shuffledAnswers[i] === correctAnswer;
        if (isCorrect) {
          updateQuestionNumColors(currentQuestionIndex, true);
        } else {
          updateQuestionNumColors(currentQuestionIndex, false);
        }

        options.forEach((opt) => {
          opt.parentElement.style.pointerEvents = "none";
        });
        option.parentElement.classList.add("blink-orange");

        // Wait for the blinking animation to finish (3 blinks = 1.5s)
        setTimeout(() => {
          option.parentElement.classList.remove("blink-orange");

          fetch("../praise.json")
            .then((response) => response.json())
            .then((responseMessages) => {
              if (isCorrect) {
                // Correct answer: Use the "praises" array
                option.parentElement.classList.add("correct-answer");
                increasePriceOnSuccess();

                const praises = responseMessages.praises;
                let randomNumber = Math.floor(Math.random() * praises.length);
                let randomMessage = praises[randomNumber];

                // Clear the question box and display the praise GIF
                question.innerHTML = "";
                const gifImage = document.createElement("img");
                gifImage.src = randomMessage.path;
                gifImage.alt = randomMessage.name;
                gifImage.style.maxWidth = "80%";
                gifImage.style.borderRadius = "1rem";
                question.appendChild(gifImage);
                resultMessage.textContent = randomMessage.message;

                updateQuestionNumColors(currentQuestionIndex, true);

                if (isCorrect) {
                  for (i = 0; i < priceAmounts.length; i++) {
                    localStorage.setItem(
                      "currentQuestionIndex",
                      currentQuestionIndex + 1
                    );
                  }
                }
                if (currentQuestionIndex >= questNumColors.length) {
                  checkForGameCompletion();
                  resetOnGameEnd();
                } else {
                  setTimeout(() => {
                    window.location.href = "../priceDashboard/price.html";
                  }, 2000);
                }
              } else {
                // Incorrect answer: Use the "failed" array
                updateQuestionNumColors(currentQuestionIndex, false);

                priceTag.style.backgroundColor = "price-tag-failure";
                option.parentElement.disabled = "true";
                option.parentElement.classList.add("incorrect-answer");
                const failed = responseMessages.failed;
                let randomNumber = Math.floor(Math.random() * failed.length);
                let randomMessage = failed[randomNumber];

                question.innerHTML = "";
                const gifImage = document.createElement("img");
                gifImage.src = randomMessage.path;
                gifImage.alt = randomMessage.name;
                gifImage.style.maxWidth = "80%";
                gifImage.style.borderRadius = "1rem";
                question.appendChild(gifImage);
                resultMessage.textContent = randomMessage.message;
                reducePriceOnFailure();

                if (currentQuestionIndex >= questNumColors.length) {
                  checkForGameCompletion();
                  resetOnGameEnd();
                } else {
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                }
              }
            })
            .catch((error) => {
              console.error("Error fetching praise messages:", error);
            });
        }, 1500); // 1.5 seconds for the blinking animation
      });
    });

    gsap.from(".question", {
      x: 200,
      opacity: 0,
      duration: 0.2,
    });
    startTimer();
  })
  .catch((error) => {
    console.error(error);
  });

quitBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});

storeBtns.forEach((storeBtn) => {
  storeBtn.addEventListener("click", () => {
    window.location.href = "../StorePage/store.html";
  });
});

timeUpCloseBtn.addEventListener("click", () => {
  timeUpModal.style.display = "none";
});
timeUpFooter.addEventListener("click", () => {
  timeUpModal.style.display = "none";
});

// Select the progress bar and modal elements

let timerDuration = 30;
let timerInterval;

// Function to start the timer
function startTimer() {
  let elapsedTime = 0;

  timerInterval = setInterval(() => {
    elapsedTime++;

    // Calculate the width percentage
    const widthPercentage =
      ((timerDuration - elapsedTime) / timerDuration) * 100;
    timerShow.style.width = `${widthPercentage}%`;

    // Trigger the modal when the timer ends
    if (elapsedTime >= timerDuration) {
      clearInterval(timerInterval); // Stop the timer
      triggerTimeUpModal(); // Trigger the modal
    }
  }, 1000); // Update every second
}

// Function to trigger the timeUpModal
function triggerTimeUpModal() {
  timeUpModal.style.display = "block";
}

// Close the modal when the close button is clicked
timeUpCloseBtn.addEventListener("click", () => {
  timeUpModal.style.display = "none";
});
const clock = document.querySelector(".timer-label");
clock.addEventListener("click", () => {
  timeUpModal.style.display = "block";
});

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

      adVideo.addEventListener("timeupdate", () => {
        const currentTime = formatTime(adVideo.currentTime);
        currentTimeDisplay.textContent = currentTime;
        progressBar.value = adVideo.currentTime;
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
          adModalFooter.style.display = "none";
        }
      });

      // Timer to track ad playback time
      const adTimer = setInterval(() => {
        totalAdTime++;

        // Show the cancel button after 40 seconds
        if (totalAdTime >= cancelTime && !cancelButtonShown) {
          cancelAdBtn.style.display = "block";
          cancelButtonShown = true;
          adModalFooter.style.display = "block";
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
        adModalFooter.style.display = "none";

        clearInterval(adTimer); // Stop the timer
      });
      adModalFooter.addEventListener("click", () => {
        adModal.style.display = "none";
        adVideo.style.display = "none";
        adVideo.pause();
        adVideo.src = "";
        window.location.href = "quiz.html";
        clearInterval(adTimer);
      });

      // Start the ad sequence
      startAdSequence();
    })
    .catch((error) => console.error("Error loading ads:", error));
});

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

gsap.from(".option-text", {
  x: 200,
  opacity: 0,
  duration: 0.5,
  stagger: 0.5,
  delay: 1.5,
});
priceTag.addEventListener("click", () => {
  window.location.href = "../priceDashboard/price.html";
});
leaveBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});
playAgain.addEventListener("click", () => {
  resetOnGameEnd();
  setTimeout(() => {
    window.location.href = "../Quizpage/quiz.html";
  }, 500);
});

function resetOnGameEnd() {
  if (currentQuestionIndex >= questNumColors.length) {
    console.log("resetting game ...");
    localStorage.removeItem("currentPrice");
    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("currentPriceIndex");
    localStorage.removeItem("questionStates");

    // Reset the current price and question index
    localStorage.setItem("currentPrice", "#500");
    localStorage.setItem("currentQuestionIndex", "0");
    localStorage.setItem("currentPriceIndex", priceAmounts.length - 1);
    questNumColors.forEach((questNumColor) => {
      questNumColor.style.backgroundColor = "white";
    });
    console.log("Game reset successful ");
  }
}
console.log("currentPrice:", localStorage.getItem("currentPrice"));
console.log("currentPriceIndex:", localStorage.getItem("currentPriceIndex"));
