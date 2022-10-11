const Appointment = require('../models/appointment.model');
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

module.exports.create = (request, response) => {
    Appointment.create(request.body) 
    .then(appointment => response.json(appointment))
    .catch((err) => {
        response.status(400).json({ err });
    });
}

const addNewAppointment = async (req, res) => {
    const { body } = req;
    let newAppointment = new Appointment(body);
    console.log(newAppointment);
    const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true});
    console.log("TOKEN", decodedJwt);
    console.log("ID: ", decodedJwt.payload.id);
    newAppointment.user_id = decodedJwt.payload.id;
    console.log('new appointment added id', newAppointment)
    try {
        newAppointment = await newAppointment.save();
        res.json(newAppointment);
        return;
    } catch (error) {
        console.log("error", error);
        res.status(400).json(error);
    }
}

module.exports = {
    addNewAppointment,
}

module.exports.getAll = (req, response) => {
    const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true});
    Appointment.find({user_id: decodedJwt.payload.id})
        .then(appointments => {
            console.log(appointments);
            response.json(appointments);
        })
        .catch((err) => {
            response.status(400).json({ err });
    });
}

module.exports.getOne = (request, response) => {
    Appointment.findOne({_id:request.params.id})
        .then(appointment => response.json(appointment))
        .catch((err) => {
            response.status(400).json({ err });
    });
}

module.exports.update = (request, response) => {
    Appointment.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators:true})
        .then(updated => response.json(updated))
        .catch((err) => {
            response.status(400).json({ err });
    });
}

module.exports.delete = (request, response) => {
    Appointment.deleteOne({ _id: request.params.id }) 
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch((err) => {
            res.status(400).json({ err });
    });
}
