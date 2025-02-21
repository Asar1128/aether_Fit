
const express = require('express');
const router = express.Router();
const db = require('../dataBase'); 

router.post('/', (req, res) => {
  const { email } = req.body;

  const query = `INSERT INTO users (user_email) VALUES (?)`;

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error inserting email:', err);
      res.status(500).json({ success: false, message: 'Database error' });
    } else {
      const user_id = results.insertId; 
      console.log("User Id is :"  , user_id)
      console.log('Email inserted successfully:', results);

      // Redirect to the name page with the userId
      res.redirect(`/Male-Questions/LoginCred/LoginName.html?user_id=${user_id}`);
    }
  });
});

module.exports = router;
