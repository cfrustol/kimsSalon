const mongoose = require('mongoose');
const KimSalonSchema = new mongoose.Schema({
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
    }
}, { timestamps: true });
module.exports = mongoose.model('Appointment', KimSalonSchema);

