const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');




// Register Api
router.post('/register', async (req,res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPass,
        });
        const user = await newUser.save();
        res.status(200).json(user)
    }catch(err){
        res.status(400).json(err)
        console.log(err);
    }
});


// Login Api
router.post('/login', async (req,res) => {
    try{
        const user = await User.findOne({email:req.body.email,});
        !user && res.status(400).json('wrong credentials');

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(422).json('Incorrect Password');

        const token = jwt.sign({id: user.id},process.env.JWT_SEC,{expiresIn: '3d'})

        const {password, ...others } = user._doc;

        res.status(200).json({...others, token});
        console.log(others);
        
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;