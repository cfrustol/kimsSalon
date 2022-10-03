const ServiceController = require('../controllers/service.controller');
module.exports = (app) => {
    app.get('/api', ServiceController.index);
    app.post('/api/services', ServiceController.create);
    app.get('/api/services', ServiceController.getAll);
    app.get('/api/services/:id', ServiceController.getOne);
    app.put('/api/services/:id', ServiceController.update);
    app.delete('/api/services/:id', ServiceController.delete);
}

