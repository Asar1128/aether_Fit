const express = require("express");
const router = express.Router();
const db = require("../dataBase");

// POST request handler for storing selected symptoms
router.post("/", (req, res) => {
  const { select, userId } = req.body;

  // If 'None of the above' is selected, handle it
  if (select.includes('9')) {
    // Optionally, you can skip the database update when 'None of the above' is selected
    return res.redirect('/quiz12to13.html');  // Redirect if 'None of the above' is selected
  }

  // Prepare the symptoms data
  const selectedSymptoms = {
    heartburn: select.includes('2') ? "Heartburn" : null,
    blood_sugar_fluctuations: select.includes('3') ? "Blood sugar fluctuations" : null,
    fatigue: select.includes('6') ? "Fatigue" : null,
    stomach_pain: select.includes('7') ? "Stomach pain" : null
  };

  // Prepare the query to update the symptoms in the database
  const query = `
    UPDATE Answers 
    SET symptoms = ?, symtom2 = ?, symtom3 = ?, symtom4 = ?
    WHERE user_Id = ?
  `;

  // Values to be passed into the query
  const values = [
    selectedSymptoms.heartburn,
    selectedSymptoms.blood_sugar_fluctuations,
    selectedSymptoms.fatigue,
    selectedSymptoms.stomach_pain,
    userId
  ];

  // Execute the database query
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Internal server error.");
    }

    if (result.affectedRows === 0) {
      console.error(`No user found with the provided user ID: ${userId}`);
      return res.status(404).send("No user found with the provided user ID.");
    }

    res.redirect(`/Male-Questions/Male-Questions/BMI.html?user_Id=${userId}`);
  });
});

module.exports = router;
