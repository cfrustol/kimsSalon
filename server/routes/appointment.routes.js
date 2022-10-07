const AppointmentController = require('../controllers/appointment.controller');
module.exports = (app) => {
    app.get('/api', AppointmentController.index);
    app.post('/api/appointments', AppointmentController.create);
    app.get('/api/appointments', AppointmentController.getAll);
    app.get('/api/appointments/:id', AppointmentController.getOne);
    app.put('/api/appointments/:id', AppointmentController.update);
    app.delete('/api/appointments/:id', AppointmentController.delete);
}

