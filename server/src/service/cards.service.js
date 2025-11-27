const { Property } = require("../../db/models")

class CardService{
     async findCard(id) {
        return Property.findByPk(id)
    }

}







module.exports = CardService