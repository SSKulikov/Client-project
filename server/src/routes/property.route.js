const PropertyService = require('../service/property.service');
const PropertyController = require('../controllers/property.controller');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const propertyRouth = require('express').Router();

const propertyService = new PropertyService();
const propertyController = new PropertyController(propertyService);

propertyRouth.get('/', propertyController.findAllProperties);
propertyRouth.get('/:id', propertyController.findProperty);
propertyRouth.get('/', verifyAccessToken, propertyController.createProperty);
propertyRouth.get('/:id', propertyController.updateProperty);
propertyRouth.get('/:id', propertyController.deleteProperty);

module.exports = propertyRouth;
