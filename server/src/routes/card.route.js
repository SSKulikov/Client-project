const CardService = require("../service/cards.service");
const CardController = require("../controllers/card.controller")
// const verifyAccessToken = require('../middlewares/verifyAccessToken');

const cardRouth = require("express").Router()

const cardService = new CardService()
const cardController = new CardController(cardService)

cardRouth.get("/:id",cardController.findCardById)

module.exports = cardRouth