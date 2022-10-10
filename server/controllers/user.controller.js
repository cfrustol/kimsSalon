const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    const { body } = req

    // const {email, password } = req.body
    
    // try {
    //     const user = await User.register(email, password)
    //     res.status(200).json({email, user})
    // } catch (error) {
    //     res.status(400).json({error: error.message})
    // }


    try {
        const queriedUser = await User.findOne({ email: body.email})
        if (queriedUser) {
            res.status(400).json({ error: "Email already in use"})
            return;
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }

    const newUser = new User(body);
    try {
        const newUserObj = await newUser.save();
        res.json(newUserObj);
    } catch (error) {
        console.log('error in the mongoose save block')
        res.status(400).json({error: error.message})
        return;
    }
    const result = await User.create(body)
    console.log("result", result)
    res.json({ msg: "you got here"})
};

const login = async (req, res) => {
    // const {email, password} = req.body
    
    // try {
    //     const user = await User.login(email, password)
    //     res.status(200).json({email, user})
    // } catch (error) {
    //     res.status(400).json({error: error.message})
    // }


    const { body } = req;
    
    if (!body.email) {
        res.status(400).json({error: "no email provided"})
        return;
    }

    let userQuery;
    try {
        userQuery = await User.findOne({email: body.email})
    } catch (error) {
        res.status(400).json({error: "email not found"})
    }

    console.log("query: ", userQuery);

    if (userQuery === null) {
        res.status(400).json({ err: "email not found"})
        return;
    }

    const passwordCheck = bcrypt.compareSync(body.password, userQuery.password)
    
    if( !passwordCheck ) {
        res.status(400).json({ error: "email and password do not match"})
        return;
    }

    const userToken = jwt.sign({ id: userQuery._id }, process.env.SECRET_KEY)
    console.log("token", userToken)

    res.cookie("usertoken", userToken, process.env.SECRET_KEY, {
        httpOnly: true,
        expires: new Date(Date.now() + 90000000)
    })
    .json({ msg: "successful login"})
};


const getAllAppointments = async (req,res) => {
    let foundUser = await User.find({email: req.params.email}).populate("appointments");
    res.json(foundUser);
};

module.exports = {
    register,
    login,
    getAllAppointments
};
