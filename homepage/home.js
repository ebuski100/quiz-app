const dailyFacts = document.querySelector(".facts");
const key = "bd2DHoYWEBZI3SRst11pdQ==AKpB7FjAFnNsNFiU";
const profileBtn = document.querySelector(".profile");

profileBtn.addEventListener("click", () => {});

const url = `https://api.api-ninjas.com/v1/facts`;

const reqOptions = {
  method: "GET",
  headers: {
    "X-Api-Key": key, // Ensure the header key is correct
  },
};

fetch(url, reqOptions)
  .then((response) => {
    console.log("Response Status:", response.status);

    return response.text().then((text) => {
      console.log("Response Body:", text); // Log the response body for debugging
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return JSON.parse(text);
    });
  })
  .then((data) => {
    console.log("Response Data:", data);
    if (data && data.length > 0) {
      const currentDate = new Date().toDateString();
      const lastFetchDate = localStorage.getItem("lastFetchDate");

      if (!lastFetchDate || currentDate !== lastFetchDate) {
        const newFact = data[0].fact; // Assuming the API returns an array of facts
        localStorage.setItem("dailyFact", newFact);
        localStorage.setItem("lastFetchDate", currentDate);
        dailyFacts.textContent = newFact;
      } else {
        dailyFacts.textContent =
          localStorage.getItem("dailyFact") || "No facts available.";
      }
    } else {
      dailyFacts.textContent = "No facts available.";
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    dailyFacts.textContent = "Failed to load facts.";
  });

const exitBtn = document.querySelector(".exit");
const yes = document.querySelector(".yes");
const No = document.querySelector(".No");
const closeModal = document.querySelector(".close-modal");
const modalFooter = document.querySelector(".modal-footer");
const exitModal = document.querySelector(".exit-modal");
const storeBtns = document.querySelectorAll(".storeBtns");
console.log(exitBtn);

storeBtns.forEach((storeBtn) => {
  storeBtn.addEventListener("click", () => {
    window.location.href = "../StorePage/store.html";
  });
});
exitBtn.addEventListener("click", () => {
  exitModal.style.display = "block";
});
closeModal.addEventListener("click", () => {
  exitModal.style.display = "none";
});

modalFooter.addEventListener("click", () => {
  exitModal.style.display = "none";
});

No.addEventListener("click", () => {
  exitModal.style.display = "none";
});

yes.addEventListener("click", () => {
  window.location.href = "chrome://newtab";
});
