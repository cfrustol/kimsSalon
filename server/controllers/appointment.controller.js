const Appointment = require('../models/appointment.model');

module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}

module.exports.create = (request, response) => {
    Appointment.create(request.body) 
    .then(appointment => response.json(appointment))
    .catch((err) => {
        response.status(400).json({ err });
    });
}

module.exports.getAll = (request, response) => {
    Appointment.find({})
        .then(appointments => {
            console.log(appointments);
            response.json(appointments);
        })
        .catch((err) => {
            res.status(400).json({ err });
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
