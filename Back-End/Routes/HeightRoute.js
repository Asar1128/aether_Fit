const express = require('express');
const router = express.Router();
const db = require('../dataBase');
router.post('/', (req, res) => {
  const { userId, height } = req.body;

  if (!userId || !height) {
    return res.status(400).send('User ID and height are required.');
  }

  const query = 'INSERT INTO Answers (height, user_id) VALUES (?, ?)';
  db.query(query, [height, userId], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Internal server error.');
    }

    if (result.affectedRows === 0) {
      return res.status(404).send('No user found with the provided ID.');
    }
    res.redirect(`/Male-Questions/Male-Questions/WeightInkg.html?user_Id=${userId}`);
  });
});

module.exports = router;
