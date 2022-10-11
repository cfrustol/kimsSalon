const { authenticate,isLoggedIn } = require('../config/jwt.config')
const { register, login, logout } = require('../controllers/user.controller');
module.exports = (app) => {
    app.post('/api/register', register);
    app.post('/api/login', login);
    // app.get('api/:email/appointments', getAllAppointments)
    app.get('/api/logout', logout)
    app.post('/api/isLoggedIn',isLoggedIn)
}

