const UserController = require('../controllers/user.controller');
const {authenticate} = require('../config/jwt.config')

module.exports = app => {
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    app.post('/api/logout', UserController.logout);
    // the route below is an example of how to require authentication (use this in the character routes file)
    // app.get('/api/users', authenticate, UserController.getAll)
}