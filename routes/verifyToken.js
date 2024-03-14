const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


module.exports.userVerification = (req,res, next) => {
    
    const token = req.headers.authorization.split(' ')[1]
    if(!token){
        return res.json({satatus: false, message: 'You are not authenticated'})
    }
    jwt.verify(token, process.env.JWT_SEC, async (err, data) =>{
        if(err) {
            return res.json({status: 'Invalid token'})
        }else{
            const user = await User.findById(data.id);
            if(user) return next() ;
        }
        
    });

}