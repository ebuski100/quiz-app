// console.log(avatarItems);

const avatarItems = document.querySelectorAll(".avatar-item");

const baseUrl = "https://api.dicebear.com/6.x/adventurer/svg?";
avatarItems.forEach((avatarItem, index) => {
  const avatarUrl = `${baseUrl}seed=avatar-${index + 1}`; // Generate unique avatar URL
  avatarItem.style.backgroundImage = `url(${avatarUrl})`;
  avatarItem.style.backgroundSize = "cover";
  avatarItem.style.backgroundPosition = "center";
  avatarItem.style.backgroundRepeat = "no-repeat";

  avatarItem.addEventListener("click", () => {
    localStorage.setItem("profileImage", avatarUrl); // Save the selected avatar URL
    window.location.href = "../EditPage/edit.html"; // Redirect to edit.html
  });
});
