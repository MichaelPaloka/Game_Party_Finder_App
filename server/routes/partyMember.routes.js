const PartyMemberController = require('../controllers/partyMember.controller');
const jwtMiddleware = require('../middleware/jwt.middleware')

// Including the middleware in the route for authentication was explained by Josh in lecture, I applied his method to own routes


module.exports = (app) => {
    app.post('/api/gamepost/:id/newpartymember', jwtMiddleware.authenticateJwt, PartyMemberController.createPartyMember);
}
