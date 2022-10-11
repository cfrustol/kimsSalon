const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const register = async (req, res) => {
    const { body } = req

    try {
        const queriedUser = await User.findOne({ email: body.email})
        if (queriedUser) {
            res.status(400).json({ error: "Email already in use"})
            return;
        }
    } catch (error) {
        res.status(400).json({error: error.message})
        return;
    }

    const newUser = new User(body);
    try {
        const newUserObj = await newUser.save();
        const userToken = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY)
        console.log("token", userToken)
        
        res.cookie("usertoken", userToken, process.env.SECRET_KEY, {
            httpOnly: true,
            expires: new Date(Date.now() + 90000000)
        })
        .json(newUserObj);
        
    }
    catch (error) {
        console.log('error in the mongoose save block')
        res.status(400).json({error})
        return;
    }
};

const login = async (req, res) => {
    const { body } = req
    try {
        if (!body.email) {
            res.status(400).json({error: "no email provided"})
            return;
        }
    } catch {
    }
    let userQuery;
    userQuery = await User.findOne({email: body.email})
    try {
        if (!userQuery) {
            res.status(400).json({error: "email not found"})
            return;
        }
    } catch {
    }

    console.log("query: ", userQuery);

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

const logout = async (req, res) => {
    res.clearCookie('usertoken');
    res.status(200).json({user:"Logged Out"})
};


module.exports = {
    register,
    login,
    logout,
};

module.exports.getOne = (request, response) => {
    User.findOne({_id:request.params.id})
        .then(user => response.json(user))
        .catch((err) => {
            response.status(400).json({ err });
    });
}