const express = require('express');
const router = express.Router();
const db = require('../dataBase');

// POST request to retrieve user data and respond with recommendations
router.post('/', (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).send('User ID is required.');
  }

  // Query to get all data from the Answers table based on userId
  const query = 'SELECT * FROM Answers WHERE user_id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Internal server error.');
    }

    if (result.length === 0) {
      return res.status(404).send('User not found.');
    }

    // Log the user data
    console.log('User Data:', result[0]);

    // Process the conditions based on the user data
    const userData = result[0]; // Assuming result[0] is the user data

    // Respond with the user data (or any other relevant information)
    res.json(userData);
  });
});

module.exports = router;
