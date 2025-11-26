const AuthService = require('../service/auth.service');
const AuthController = require('../controllers/auth.controller');

const authRouth = require('express').Router();

const authService = new AuthService();
const authController = new AuthController(authService);

authRouth.post('/registration', authController.registration);
authRouth.post('/login', authController.login);
authRouth.delete('/logout', authController.logout);
authRouth.get('/refresh', authController.refresh);


module.exports = authRouth;
