const modal = document.getElementById("myModal");
const modal1 = document.querySelector(".modal1");

const bannerBtn = document.querySelector(".banner-edit-btn");

const profileBtn = document.querySelector(".edit-img-btn");
const closePicsBtn = document.getElementById("close-pics-modal");
const closeBannerBtn = document.getElementById("close-banner-modal");

const modalFooters = document.querySelectorAll(".modal-footer");

const profileGalleryInput = document.getElementById("profileGalleryInput");

const bannerGalleryInput = document.getElementById("bannerGalleryInput");

const profile_Image = document.querySelector(".image-avatar");

const img = document.getElementById("chosen-image");

const banner_Image = document.querySelector(".edit-header");

const profileGallery = document.querySelector(".profileGallery");

const bannerGallery = document.querySelector(".bannerGallery");

const removeProfileBtn = document.querySelector(".remove-profile-btn");
const removeBannerBtn = document.querySelector(".remove-banner-btn");

const profileCameraBtn = document.getElementById("profile-camera-btn");
const bannerCameraBtn = document.getElementById("banner-camera-btn");

profileCameraBtn.addEventListener("click", () => {
  localStorage.setItem("captureMode", "profileImage"); // Set flag for profile image
  window.location.href = "../photoCapture/camera.html"; // Redirect to camera.html
});

bannerCameraBtn.addEventListener("click", () => {
  localStorage.setItem("captureMode", "bannerImage"); // Set flag for banner image
  window.location.href = "../photoCapture/camera.html"; // Redirect to camera.html
});
removeProfileBtn.addEventListener("click", () => {
  // Clear the image source
  localStorage.removeItem("profileImage"); // Remove the image from localStorage
  img.src = "../images/user (5).png"; // Clear the image source
  modal.style.display = "none"; // Close the modal
});

removeBannerBtn.addEventListener("click", () => {
  banner_Image.style.backgroundImage = "none"; // Clear the background image
  localStorage.removeItem("bannerImage"); // Remove the image from localStorage
  modal1.style.display = "none"; // Close the modal
});

modalFooters.forEach((modalFooter) => {
  modalFooter.addEventListener("click", () => {
    modal1.style.display = "none";
    modal.style.display = "none";
  });
});
bannerBtn.addEventListener("click", () => {
  modal1.style.display = "block";
});

console.log(bannerBtn);

profileBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closePicsBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
closeBannerBtn.addEventListener("click", () => {
  modal1.style.display = "none";
});

profileGallery.addEventListener("click", () => {
  profileGalleryInput.click();
});
bannerGallery.addEventListener("click", () => {
  bannerGalleryInput.click();
});

const image = localStorage.getItem("profileImage");
if (image) {
  img.src = image;
}

const banner = localStorage.getItem("bannerImage");
if (banner) {
  banner_Image.style.backgroundImage = `url(${banner})`;
}

bannerGalleryInput.addEventListener("change", (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result; // Get the image data
      banner_Image.style.backgroundImage = `url(${imageData})`; // Set the banner background
      localStorage.setItem("bannerImage", imageData); // Store the image in localStorage
      console.log("Banner image stored in localStorage:", imageData); // Debugging log
    };
    reader.readAsDataURL(files[0]); // Read the first file as a data URL
    modal1.style.display = "none"; // Close the modal
  }
});

profileGalleryInput.addEventListener("change", (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      img.src = imageData; // Update the existing #chosen-image element
      localStorage.setItem("profileImage", imageData); // Save the selected image to localStorage
    };
    modal.style.display = "none"; // Close the modal
    reader.readAsDataURL(files[0]);
  }
});
