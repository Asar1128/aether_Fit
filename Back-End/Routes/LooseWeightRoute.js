const express = require("express");
const router = express.Router();
const db = require("../dataBase");

// POST request handler for Yes/No selection
router.post("/", (req, res) => {
  const { select } = req.body; 
  const userId = parseInt(req.body.userId, 10);

  // Validate Yes/No value
  if (!["Y", "N"].includes(select)) {
    return res.status(400).send("Invalid value for Yes/No.");
  }

  const choice = select === "1" ? "Y" : "N"; 

  const query = "UPDATE Answers SET lose_weight = ? WHERE user_Id = ?";
  db.query(query, [choice, userId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Internal server error.");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("No user found with the provided user ID.");
    }
     res.redirect(`/Male-Questions/Male-Questions/UpcomingEvent.html?user_Id=${userId}`);
  });
});

module.exports = router;
