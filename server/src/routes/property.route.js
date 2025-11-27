const PropertyService = require('../service/property.service');
const PropertyController = require('../controllers/property.controller');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const propertyRouth = require('express').Router();

const propertyService = new PropertyService();
const propertyController = new PropertyController(propertyService);

propertyRouth.get('/', propertyController.findAllProperties);


propertyRouth.post('/', verifyAccessToken, propertyController.createProperty);
propertyRouth.put('/:id', propertyController.updateProperty);
propertyRouth.delete('/:id', propertyController.deleteProperty);


propertyRouth.get('/favorites', verifyAccessToken, propertyController.getFavorites);
propertyRouth.post('/:id/favorite', verifyAccessToken, propertyController.addToFavorites);
propertyRouth.delete('/:id/favorite', verifyAccessToken, propertyController.removeFromFavorites); 
propertyRouth.get('/:id', propertyController.findProperty);



module.exports = propertyRouth;
