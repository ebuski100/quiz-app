document.addEventListener("DOMContentLoaded", () => {
  const userProfile = document.querySelector(".userProfile");
  const savedProfileImage = localStorage.getItem("profileImage");
  if (savedProfileImage) {
    userProfile.src = savedProfileImage;
  }
});
