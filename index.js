const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/user.js');

const {MONGO_DB_URL, PORT} = process.env;
const app = express();

mongoose.connect(MONGO_DB_URL)
.then(()=> console.log('Mongodb connection is successfull'))
.catch((err) => {
    console.log(err)
});


//All API Routes Goes Here
app.use(express.json())
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);





app.listen(process.env.PORT || 5000, ()=>{
    console.log(`server running on PORT ${PORT}`);
}) 

