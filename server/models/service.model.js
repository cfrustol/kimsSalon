const mongoose = require('mongoose');
const KimSalonSchema = new mongoose.Schema({
    type: { 
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
module.exports = mongoose.model('Service', KimSalonSchema);

