class CardController {
  constructor(cardService) {
    this.cardService = cardService;
  }

  findCardById = async (req,res) => {
    try {
        const { id } = req.params
        const card = await this.cardService.findCard(id)
        return res.status(200).json(card)
    } catch (error) {
        console.log(error);
        res.status(404)
    }

  }
}
module.exports = CardController