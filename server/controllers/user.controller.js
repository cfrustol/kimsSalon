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
        return;
    }

    const newUser = new User(body);
    try {
        const newUserObj = await newUser.save();
        res.json(newUserObj);
    } catch (error) {
        console.log('error in the mongoose save block')
        res.status(400).json({error})
        return;
    }
    const result = await User.create(body)
    let userQuery;
    userQuery = await User.findOne({email: body.email})
    const userToken = jwt.sign({ id: userQuery._id }, process.env.SECRET_KEY)
    console.log("token", userToken)

    res.cookie("usertoken", userToken, process.env.SECRET_KEY, {
        httpOnly: true,
        expires: new Date(Date.now() + 90000000)
    })
    console.log("result", result)
    
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


const getAllAppointments = async (req,res) => {
    let foundUser = await User.find({email: req.params.email}).populate("appointments");
    res.json(foundUser);
};

// const UserController = {

//     register: (req, res) => {
//         User.create(req.body)
//           .then((user) => {
//             const {_id,firstName,...other} = user

//             const userToken = jwt.sign({
//                 id:user._id
//             },process.env.JWT_KEY)

//             res.cookie("usertoken",userToken,{
//                 httpOnly:true
//             }).status(201).json({user:{id:_id,name:firstName}})
 
//           })
//           .catch(err => res.json(err));
//       },

//       login:(req, res)=>{

//         // console.log(process.env)
//         // console.log(process.env.JWT_KEY)
//         User.findOne({email:req.body.email})
//         .then((user)=>{
            
//             const {_id,firstName,...other} = user
//             if(user === null){
                
//                 res.status(400)
//             }
//             bcrypt.compare(req.body.password,user.password)
//             .then(()=>{
//                 const userToken = jwt.sign({
//                     id:user._id
//                 },process.env.JWT_KEY)

//                 res.cookie('usertoken',userToken,{
//                     httpOnly:true
//                 }).json({user:{id:_id,name:firstName}})
//             })
//             .catch(()=>{
                
//                 res.status(400)
//             })
//         })
//         .catch((err)=>{
//             res.status(400).json({msg:"something went wrong",error:err})
//         })
//       },
//       logout: (req, res) => {
//         res.clearCookie('usertoken');
//         res.status(200).json({user:"Logged Out"})
//         },
//         getAll:(req,res)=>{
//             User.find({})
//             .then((users)=>{
//                 res.json(users)
//             })
//             .catch((err)=>{
//                 console.log("error getting users")
//             })
//         }
    
// };

module.exports = {
    register,
    login,
    logout,
};
