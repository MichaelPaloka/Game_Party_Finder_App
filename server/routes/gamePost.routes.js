const GamePostController = require('../controllers/gamePost.controller');
const jwtMiddleware = require('../middleware/jwt.middleware')

// Including the middleware in the route for authentication was explained by Josh in lecture, I applied his method to own routes

module.exports = (app) => {
    app.post('/api/gamepost', jwtMiddleware.authenticateJwt, GamePostController.createGamePost);
    app.get('/api/gamepost', jwtMiddleware.authenticateJwt, GamePostController.getAllGamePosts);
    app.get('/api/gamepost/:id', jwtMiddleware.authenticateJwt, GamePostController.getSingleGamePost);
    app.put('/api/gamepost/:id', jwtMiddleware.authenticateJwt, GamePostController.updateGamePost);
    app.delete('/api/gamepost/:id', jwtMiddleware.authenticateJwt, GamePostController.deleteGamePost);
}
