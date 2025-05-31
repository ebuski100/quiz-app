const username = localStorage.getItem("username");
const age = localStorage.getItem("age");

if (!username || !age) {
  setTimeout(() => {
    window.location.href = "../RegisterPage/register.html";
  }, 5000);
} else {
  setTimeout(() => {
    localStorage.setItem("showWelcome", "true");
    location.href = "../homePage/home.html";
  }, 5000);
}
