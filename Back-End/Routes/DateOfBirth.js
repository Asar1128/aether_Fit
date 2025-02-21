const express =  require('express')
const router = express.Router();
const db = require('../dataBase')

router.post('/' , (req , res)=>{
    const {dob} = req.body;
    const userId = parseInt(req.body.userId , 10)

    if(isNaN(userId)){
        return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    const query = `UPDATE users SET dob = ? WHERE user_id = ?`;
    db.query(query , [dob , userId] , (err , results)=>{
        if(err){
            return res.status(500).json({success:false , message:"Data Base error"})
        }

        res.redirect(`Male-Questions/Male-Questions/GenderSelect.html?user_Id=${userId}`)
    })
})





module.exports = router;