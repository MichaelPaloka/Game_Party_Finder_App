const UserController = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/api/user', UserController.register);
    app.post('/api/user/login', UserController.login);
    app.post('/api/user/logout', UserController.logout);
    // app.put('/api/user/:id', UserController.updateProduct);
    // app.delete('/api/user/:id', UserController.deleteProduct);
}
