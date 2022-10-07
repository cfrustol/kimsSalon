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
        validate: {
            validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    phoneNumber: { 
        type: Number,
        required: [ true, "Phone number is required"],
    },
    password: { 
        type: String,
        required: [ true, "Please select a time"],
        minlength: [8, "Password must be 8 characters or longer"]
    }
}, { timestamps: true });

UserSchema.virtual("confirmPassword")
    .get(() => this.confirmPassword)
    .set((value) =>{
        this.confirmPassword = value
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

module.exports = mongoose.model('User', UserSchema);
