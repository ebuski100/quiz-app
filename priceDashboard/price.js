// Select all price items
const level1Items = Array.from(
  document.querySelectorAll(".level1-item")
).reverse();
const level2Items = Array.from(
  document.querySelectorAll(".level2-item")
).reverse();
const level3Items = Array.from(
  document.querySelectorAll(".level3-item")
).reverse();
const oneMillionItem = document.querySelector(".one-million");

// Combine all items into a single array for easier processing
const allItems = [
  ...level1Items,
  ...level2Items,
  ...level3Items,
  oneMillionItem,
];

// Get the current question index from localStorage
let currentQuestionIndex =
  parseInt(localStorage.getItem("currentQuestionIndex")) || 0;

// Function to update the background colors dynamically
function updatePriceColors() {
  allItems.forEach((item, index) => {
    if (index < currentQuestionIndex) {
      // Prices already won
      item.style.backgroundColor = "green";
      item.style.border = "3px solid darkGreen";
    } else if (index === currentQuestionIndex) {
      // Next price to win
      item.style.backgroundColor = "orange";
      item.classList.add("blinking-orange"); // Add blinking effect
      localStorage.setItem("currentPrice", item.textContent);
    } else {
      item.style.backgroundColor = "grey";
    }
  });
}

updatePriceColors();

setTimeout(() => {
  window.location.href = "../Quizpage/quiz.html";
}, 3000);
