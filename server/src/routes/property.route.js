const PropertyService = require('../service/property.service');
const PropertyController = require('../controllers/property.controller');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const MessageController = require('../controllers/message.controller');
const propertyRouth = require('express').Router();

const propertyService = new PropertyService();
const propertyController = new PropertyController(propertyService);
const messageController = new MessageController();

propertyRouth.get('/', propertyController.findAllProperties);


propertyRouth.post('/', verifyAccessToken, propertyController.createProperty);
propertyRouth.put('/:id', propertyController.updateProperty);
propertyRouth.delete('/:id', verifyAccessToken, propertyController.deleteProperty);
propertyRouth.get('/jhj', verifyAccessToken, propertyController.findAllPropertiesofLandor)

propertyRouth.get('/favorites', verifyAccessToken, propertyController.getFavorites);
propertyRouth.post('/:id/favorite', verifyAccessToken, propertyController.addToFavorites);
propertyRouth.delete('/:id/favorite', verifyAccessToken, propertyController.removeFromFavorites); 
propertyRouth.get('/:id', propertyController.findProperty);

propertyRouth.get('/messages', verifyAccessToken, messageController.getMessages);
propertyRouth.post('/messages', verifyAccessToken, messageController.sendMessage);

module.exports = propertyRouth;
