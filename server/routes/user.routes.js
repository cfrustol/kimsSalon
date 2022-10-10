const { register, login, getAllAppointments } = require('../controllers/user.controller');
module.exports = (app) => {
    app.post('/api/register', register);
    app.post('/api/login', login);
    app.get('api/:email/appointments', getAllAppointments)
}

