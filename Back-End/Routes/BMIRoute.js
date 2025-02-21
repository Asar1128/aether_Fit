const express = require('express');
const router = express.Router();
const db = require('../dataBase');

// POST request to handle BMI calculation
router.post('/', (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).send('User ID is required.');
  }

  // Query to get height and weight from the database
  const query = 'SELECT height, weight FROM Answers WHERE user_id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Internal server error.');
    }

    if (result.length === 0) {
      return res.status(404).send('User not found.');
    }

    // Extract height and weight
    const { height, weight } = result[0];

    if (!height || !weight) {
      return res.status(400).send('Height and weight data are missing.');
    }

    // Convert height from cm to meters
    const heightInMeters = height / 100;

    // Convert weight from lbs to kg
    const weightInKg = weight / 2.20462; 

    // Calculate BMI and remove decimals
    const bmi = Math.floor(weightInKg / (heightInMeters * heightInMeters)); 

    // Log the BMI to the console
    console.log(`Calculated BMI for user ${userId}: ${bmi}`);

    // Insert BMI into the database
    const bmiQuery = 'UPDATE Answers SET BMI = ? WHERE user_id = ?';
    db.query(bmiQuery, [bmi, userId], (err, result) => {
      if (err) {
        console.error('Error updating BMI:', err);
        return res.status(500).send('Error updating BMI in the database.');
      }

      if (result.affectedRows === 0) {
        return res.status(404).send('No user found to update BMI.');
      }

      // Respond by returning a success message
      res.redirect(`/Male-Questions/Male-Questions/Recommendation.html?user_Id=${userId}`);
    });
  });
});

module.exports = router;
