const express = require("express");
const router = express.Router();
const db = require("../dataBase");

// POST request handler for body type selection
router.post("/", (req, res) => {
  const { choice, userId } = req.body;

  // Validate body type choice
  if (!["Ectomorph", "Mesomorph", "Endomorph"].includes(choice)) {
    return res.status(400).send("Invalid body type choice.");
  }

  const query = "UPDATE Answers SET body_type = ? WHERE user_Id = ?";
  db.query(query, [choice, userId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Internal server error.");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("No user found with the provided user ID.");
    }

    // Send success response
    res.redirect(`/Male-Questions/Male-Questions/OverAllBodyHealth.html?user_Id=${userId}`);
  });
});

module.exports = router;
