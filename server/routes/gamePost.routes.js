const GamePostController = require('../controllers/gamePost.controller');

module.exports = (app) => {
    app.post('/api/gamepost', GamePostController.createGamePost);
    app.get('/api/gamepost', GamePostController.getAllGamePosts);
    app.get('/api/gamepost/:id', GamePostController.getSingleGamePost);
    // app.put('/api/user/:id', UserController.updateProduct);
    app.delete('/api/gamepost/:id', GamePostController.deleteGamePost);
}
