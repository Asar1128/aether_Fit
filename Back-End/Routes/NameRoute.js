const express = require('express');
const router = express.Router();
const db = require('../dataBase'); // Import the database connection

router.post('/', (req, res) => {
  const { Name } = req.body;
  const userId = parseInt(req.body.userId, 10);

  if (isNaN(userId)) {
      return res.status(400).json({ success: false, message: "Invalid userId" });
  }

  const query = `UPDATE users SET user_name = ? WHERE user_id = ?`;
  db.query(query, [Name, userId], (err, results) => {
      if (err) {
          console.error('Error updating name:', err);
          return res.status(500).json ({ success: false, message: 'Database error' });
      }
      res.redirect(`/Male-Questions/LoginCred/LoginDate.html?user_Id=${userId}`);
  });
});
module.exports = router;
