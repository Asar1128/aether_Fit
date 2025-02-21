const express = require("express");
const router = express.Router();
const db = require("../dataBase");

// POST request handler for overall health rating
router.post("/", (req, res) => {
  const { choice, userId } = req.body;

  // Validate overall health choice (using descriptive values)
  const validRatings = ["Poor", "Could be better", "Average", "Pretty good", "Olympic athlete"];
  if (!validRatings.includes(choice)) {
    return res.status(400).send("Invalid overall health rating.");
  }

  const query = "UPDATE Answers SET physical_health = ? WHERE user_Id = ?";
  db.query(query, [choice, userId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Internal server error.");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("No user found with the provided user ID.");
    }

    res.redirect(`/Male-Questions/Male-Questions/Symptoms.html?user_Id=${userId}`);
  });
});

module.exports = router;
