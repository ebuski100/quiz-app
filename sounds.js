function playCoinPurchaseSound() {
  if (soundState == "on") {
    setTimeout(() => {
      const coinSound = new Audio("../sounds/coinPurchase.wav"); // Replace with the actual path to your sound file
      coinSound.currentTime = 0; // Reset the sound to the beginning
      coinSound.play().catch((error) => {
        console.error("Error playing coin sound:", error);
      });
    }, 2000);
  }
}
function playPurchaseFailSound() {
  if (soundState == "on") {
    setTimeout(() => {
      const coinSound = new Audio("../sounds/datsIncorrect.wav"); // Replace with the actual path to your sound file
      coinSound.currentTime = 0; // Reset the sound to the beginning
      coinSound.play().catch((error) => {
        console.error("Error playing coin sound:", error);
      });
    }, 300);
  }
}
