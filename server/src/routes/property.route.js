const PropertyService = require('../service/property.service')
const PropertyController = require("../controllers/property.controller")

const propertyRouth = require('express').Router()

const propertyService = new PropertyService()
const propertyController = new PropertyController(propertyService)

propertyRouth.get('/')