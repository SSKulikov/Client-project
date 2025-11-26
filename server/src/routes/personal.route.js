const PersonalController = require('../controllers/personal.controllers');
const PersonalService = require('../service/personal.service');
const personalRoute = require('express').Router();

const personalService = new PersonalService();
const personalController = new PersonalController(personalService);

personalRoute.get('/', personalController.getPersonal);

module.exports = personalRoute;