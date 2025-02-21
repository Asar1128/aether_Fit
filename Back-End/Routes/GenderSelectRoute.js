const express = require("express");
const router = express.Router();
const db = require("../dataBase"); 

// POST request handler for gender update
router.post("/", (req, res) => {
  const { select } = req.body; 
  const userId = parseInt(req.body.userId , 10)

  // Validate gender value
  if (!["1", "2"].includes(select)) {  
    return res.status(400).send("Invalid gender value.");
  }

  const gender = select === "1" ? "M" : "F";  

  const query = "UPDATE users SET user_gender = ? WHERE user_Id = ?";
  db.query(query, [gender , userId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Internal server error.");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("No user found with the provided email.");
    }

    res.redirect(`Male-Questions/Male-Questions/HeightInFeet.html?user_Id=${userId}`)
  
  });
});

module.exports = router;
