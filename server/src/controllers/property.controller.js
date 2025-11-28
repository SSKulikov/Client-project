class PropertyController {
  constructor(propertyService) {
    this.propertyService = propertyService;
  }

  findAllProperties = async (req, res) => {
    try {
      console.log(req.query, '<------- INFO HERE');

      let properties = [];

      // if (req.query.type) {
      //   properties = await this.propertyService.findByType(req.query.type);
      // } else {
      properties = await this.propertyService.findByType(
        req.query.type,
        req.query.priceMin,
        req.query.priceMax,
      );
      // }

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

      console.log('User ID from token:', user.id);
      const newProperty = await this.propertyService.createProperty(req.body, user.id);
      return res.status(201).json(newProperty);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateProperty = async (req, res) => {
    try {
      const { id } = req.params;
      const updateProperty = await this.propertyService.updateProperty(id, req.body);
      if (!updateProperty) {
        return res.status(404).send('Недвижимость не найдена');
      }
      return res.json(updateProperty);
    } catch (error) {
      console.log(error);
      res.sendStatus(401);
    }
  };

  deleteProperty = async (req, res) => {
    try {
      console.log('pending');

      const { id } = req.params;
      console.log(id);

      const { user } = res.locals;
      const property = await this.propertyService.findProperty(id);
      console.log('seccess one');

      if (property.userId !== user.id) {
        return res.sendStatus(403);
      }
      console.log('pending 2');

      await this.propertyService.deleteProperty(id);
      console.log('pending 23');

      return res.sendStatus(204);
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

  findAllPropertiesofLandor = async (req, res) => {
    try {
      const { user } = res.locals;
      const properties = await this.propertyService.findAllPropertiesofLandor(user.id);
      return res.status(200).json(properties);
    } catch (error) {
      console.log(error);
      res.sendStatus(401);
    }
  };

  findByType = async (req, res) => {
    try {
      const { type } = req.params.type;
      if (!type) {
        return res.json([]);
      }
      const properties = await this.propertyService.findByType(type);
      return res.status(200).json(properties);
    } catch (error) {
      console.log(error);
    }
  };

  findByPrice = async (req, res) => {
    try {
      const { priceMin } = req.params.priceMin;
      const { priceMax } = req.params.priceMax;

      if (!priceMin && !priceMax) {
        return res.json([]);
      }

      const properties = await this.propertyService.findByPrice(priceMin, priceMax);
      return res.status(200).json(properties);
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = PropertyController;
