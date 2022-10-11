const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: [ true, "First name is required" ],
    },
    lastName: { 
        type: String,
        required: [ true, "Last name is required"],
    },
    email: { 
        type: String,
        required: [ true, "Email is required"],
        unique: [true, "Email is already being used"],
        validate: {
            validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    phoneNumber: { 
        type: String,
        required: [ true, "Phone number is required"],
    },
    password: { 
        type: String,
        required: [ true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment"
    }]
}, { timestamps: true });

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) =>{
        this._confirmPassword = value
    });

UserSchema.pre("validate", function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords must match")
    }
    next();
});

UserSchema.pre('save', function (next){
    bcrypt.hash(this.password, 10)
    .then((hash)=>{
        this.password=hash;
        next();
    })
    .catch(err =>{
        console.log("error saving hash")
        console.log(err)
    })
});

// static register method
// UserSchema.statics.register = async function(email, password) {
    
//     // validation
//     if((!email || !password)) {
//         throw Error('All fields must be filled')
//     }
//     if(!validator.isEmail(email)) {
//         throw Error('Email is not valid')
//     }
//     if(!validator.isStrongPassword(password)) {
//         throw Error('Password is not strong enough')
//     }
    
//     const exists = await this.findOne({email})
//     if (exists) {
//         throw Error('Email already in use')
//     }

//     const salt = await bcrypt.genSalt(10)
//     const hash = await bcrypt.hash(password, salt)

//     const user = await this.create({ email, password: hash })

//     return user
// }

//static login method
// UserSchema.statics.login = async function(email, password) {
//     if((!email || !password)) {
//          throw Error('All fields must be filled')
//      }
//      const user = await this.findOne({email})
//      if (!user) {
//          throw Error('Incorrect Email')
//      }

//      const match = await bcrypt.compare(password, user.password)
//      if(!match) {
//         throw Error('Incorrect Password')
//      }

//      return user
// }

module.exports = mongoose.model('User', UserSchema);
