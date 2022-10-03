const Service = require('../models/service.model');

module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}

module.exports.create = (request, response) => {
    Service.create(request.body) 
    .then(service => response.json(service))
    .catch((err) => {
        response.status(400).json({ err });
    });
}

module.exports.getAll = (request, response) => {
    Service.find({})
        .then(services => {
            console.log(services);
            response.json(services);
        })
        .catch((err) => {
            res.status(400).json({ err });
    });
}

module.exports.getOne = (request, response) => {
    Service.findOne({_id:request.params.id})
        .then(service => response.json(service))
        .catch((err) => {
            response.status(400).json({ err });
    });
}

module.exports.update = (request, response) => {
    Service.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators:true})
        .then(updated => response.json(updated))
        .catch((err) => {
            response.status(400).json({ err });
    });
}

module.exports.delete = (request, response) => {
    Service.deleteOne({ _id: request.params.id }) 
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch((err) => {
            res.status(400).json({ err });
    });
}
