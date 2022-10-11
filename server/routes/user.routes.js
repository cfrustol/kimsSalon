const { authenticate,isLoggedIn } = require('../config/jwt.config')
const { register, login, logout } = require('../controllers/user.controller');
const UserController = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/api/register', register);
    app.post('/api/login', login);
    app.get('/api/logout', logout)
    app.post('/api/isLoggedIn',isLoggedIn)
    app.get('/api/getUser/:id', UserController.getOne)
}

