require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors({credentials: true, origin: process.env.CLIENT_URL}));
app.use(express.json());                           
app.use(express.urlencoded({ extended: true }));
require('./config/mongoose.config');    
require('./routes/user.routes')(app);
require('./routes/appointment.routes')(app);

// const jwt = require('jsonwebtoken');
// var token = jwt.sign({id: 'jjs2n8s1380js'}, process.env.SECRET_KEY);
// console.log('token : ', token)

app.listen(process.env.PORT, () => {
    console.log("Running on", process.env.PORT)
})