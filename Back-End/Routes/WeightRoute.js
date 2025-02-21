const express = require('express');
const router = express.Router();
const db = require('../dataBase');

router.post('/', (req, res) => {
    const { userId, weightInLB } = req.body;
  
    if (!userId || !weightInLB) {
      return res.status(400).send('User ID and Weight are required.');
    }
  
    const query = `UPDATE Answers SET weight = ? where user_id = ?`;
    db.query(query, [weightInLB, userId], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Internal server error.');
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).send('No user found with the provided ID.');
      }
  
      res.redirect(`/Male-Questions/Male-Questions/TryingToLooseWeight.html?user_Id=${userId}`);
    });
  });
  
  module.exports = router;
  