const question = document.querySelector(".question-box");
const options = document.querySelectorAll(".option-text");
const storeBtns = document.querySelectorAll(".storeBtn");
const quitBtn = document.querySelector(".quit-btn");

const url = "https://opentdb.com/api.php?amount=1&type=multiple";

fetch(url)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    question.textContent = data.results[0].question;
    const incorrectAnswers = data.results[0].incorrect_answers;
    const correctAnswer = data.results[0].correct_answer;
    incorrectAnswers.push(correctAnswer);

    console.log(incorrectAnswers);

    options.forEach((option, i) => {
      option.textContent = incorrectAnswers[i];
    });
  })
  .catch((error) => {
    console.error(error);
  });

quitBtn.addEventListener("click", () => {
  window.location.href = "../homePage/home.html";
});

storeBtns.forEach((storeBtn) => {
  storeBtn.addEventListener("click", () => {
    window.location.href = "../StorePage/store.html";
  });
});
