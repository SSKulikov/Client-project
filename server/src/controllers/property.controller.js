class PropertyController {
  constructor(propertyService) {
    this.propertyService = propertyService;
  }

  findAllProperties = async (req, res) => {
    try {
      const properties = await this.propertyService.findAllProperties();
      return res.status(200).json(properties);
    } catch (error) {
      console.log(error);
      res.sendStatus(401);
    }
  };

  findProperty = async (req, res) => {
    try {
      const { id } = req.params;
      const property = await this.propertyService.findProperty(id);
      if (!property) {
        return res.status(404).send('Недвижимость не найдена');
      }
      return res.status(200).json(property);
    } catch (error) {
      console.log(error);
      res.sendStatus(401);
    }
  };

  createProperty = async (req, res) => {
    try {
      const { user } = res.locals;
      
    console.log("User ID from token:", user.id);
      const newProperty = await this.propertyService.createProperty(
        req.body,
        user.id,
      );
       return res.status(201).json(newProperty);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  };

  updateProperty = async (req, res) => {
    try {
      const { id } = req.params;
      const updateProperty = await this.propertyService.updateProperty(id, req.body);
      if (!updateProperty) {
        return res.status(404).send('Недвижимость не найден');
      }
      return res.json(updateProperty);
    } catch (error) {
      console.log(error);
      res.sendStatus(401);
    }
  };

  deleteProperty = async (req, res) => {
    try {
      const { id } = req.pararms;
      const { user } = res.locals;
      const property = await this.propertyService.findProperty(id);
      if (property.userId !== user.id) {
        return res.sendStatus(403);
      }
      await this.propertyService.deleteProperty(id);
      return res.status(204);
    } catch (error) {
      console.log(error);
      res.sendStatus(401);
    }
  };

  getFavorites = async (req, res) => {
    try {
      const { user } = res.locals; 
      const favorites = await this.propertyService.findFavoritesByUser(user.id);
      return res.status(200).json(favorites);
    } catch (error) {
      console.log(error);
      res.sendStatus(401);
    }
  };

 
  addToFavorites = async (req, res) => {
    try {
      const { user } = res.locals;
      const { id } = req.params;
      await this.propertyService.addFavorite(user.id, id);
      return res.sendStatus(201);
    } catch (error) {
      console.log(error);
      res.sendStatus(401);
    }
  };

  removeFromFavorites = async (req, res) => {
    try {
      const { user } = res.locals;
      const { id } = req.params;
      await this.propertyService.removeFavorite(user.id, id);
      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.sendStatus(401);
    }
  };
}

module.exports = PropertyController;
