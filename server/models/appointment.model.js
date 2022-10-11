const mongoose = require('mongoose');
const AppointmentSchema = new mongoose.Schema({
    service: { 
        type: String,
        required: [ true, "Please select service type" ],
    },
    day: { 
        type: String,
        required: [ true, "Please select a day"],
        
    },
    time: { 
        type: String,
        required: [ true, "Please select a time"],
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });
module.exports = mongoose.model('Appointment', AppointmentSchema);

