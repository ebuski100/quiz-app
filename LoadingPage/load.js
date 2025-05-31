const username = localStorage.getItem("username");
const age = localStorage.getItem("age");

if (!username || !age) {
  setTimeout(() => {
    window.location.href = "/quiz-app/RegisterPage/register.html";
  }, 5000);
} else {
  setTimeout(() => {
    localStorage.setItem("showWelcome", "true");
    window.location.href = "/quiz-app/homePage/home.html";
  }, 5000);
}
