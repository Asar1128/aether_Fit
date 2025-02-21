const express = require("express");
const router = express.Router();
const db = require("../dataBase");

// POST request handler for Yes/No selection
router.post("/", (req, res) => {
  const { choice } = req.body;
  const userId = parseInt(req.body.userId, 10);

  // Validate Yes/No value ("Y" or "N")
  if (!["Y", "N"].includes(choice)) {
    return res.status(400).send("Invalid value for Yes/No.");
  }

  const query = "UPDATE Answers SET upcoming_event = ? WHERE user_Id = ?";
  db.query(query, [choice, userId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Internal server error.");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("No user found with the provided user ID.");
    }
    res.redirect(`/Male-Questions/Male-Questions/BodyType.html?user_Id=${userId}`);
  });
});

module.exports = router;
