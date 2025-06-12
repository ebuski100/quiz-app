import express from "express";
import fetch from "fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
const url = `https://api.api-ninjas.com/v1/facts`;
const reqOptions = {
  method: "GET",
  headers: {
    "X-Api-Key": process.env.API_KEY,
  },
};

app.get("/api/facts", async (req, res) => {
  fetch(url, reqOptions)
    .then((response) => {
      console.log("Response Status:", response.status);

      return response.text().then((text) => {
        console.log("Response Body:", text); //
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return JSON.parse(text);
      });
    })
    .then((data) => {
      console.log("Response Data:", data);
      // if (data && data.length > 0) {
      //   const currentDate = new Date().toDateString();
      //   const lastFetchDate = localStorage.getItem("lastFetchDate");

      //   if (!lastFetchDate || currentDate !== lastFetchDate) {
      //     const newFact = data[0].fact; //
      //     localStorage.setItem("dailyFact", newFact);
      //     localStorage.setItem("lastFetchDate", currentDate);
      //     dailyFacts.textContent = newFact;
      //   } else {
      //     dailyFacts.textContent =
      //       localStorage.getItem("dailyFact") || "No facts available.";
      //   }
      // }
    })
    .catch((error) => {
      console.error("Error:", error);
      // dailyFacts.textContent = "Failed to load facts.";
    });
});

app.listen(3000, () => {
  console.log(`server listening on port 3000`);
});
