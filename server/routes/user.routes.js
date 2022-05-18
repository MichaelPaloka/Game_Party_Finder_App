const UserController = require('../controllers/user.controller');
const jwtMiddleware = require('../middleware/jwt.middleware')

module.exports = (app) => {
    app.post('/api/user', UserController.register);
    app.post('/api/user/login', UserController.login);
    app.post('/api/user/logout', UserController.logout);
    // app.get('/api/user/:id', UserController.getUser);
    app.get('/api/user/:id', UserController.getLoggedInUser);
    app.put('/api/user/:id', UserController.updateProfile);
}
