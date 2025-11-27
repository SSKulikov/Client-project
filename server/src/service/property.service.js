const { Property, Favorites } = require('../../db/models');

class PropertyService {
  async findAllProperties() {
    return Property.findAll();
  }

  async findProperty(id) {
    return Property.findByPk(id);
  }

  async createProperty(data, userId) {
    try {
      const result = await Property.create({
        ...data,
        userId: userId,
      });

      return result;
    } catch (error) {
      console.log('Service: Ошибка при создании в БД:', error);
      throw error;
    }
  }

  async updateProperty(id, data, userId) {
    const property = await Property.findOne({ where: { id, userId } });
    if (!property) {
      return null;
    }
    return property.update(data);
  }

  async deleteProperty(id, userId) {
    const property = await Property.findOne({ where: { id, userId } });
    if (!property) {
      return null;
    }

    await Property.destroy({ where: { id, userId } });
    return true;
  }

  async findFavoritesByUser(userId) {
    const favorites = await Favorites.findAll({ where: { userId } });
    const ids = favorites.map((f) => f.propertyId);
    if (ids.length === 0) return [];
    return Property.findAll({ where: { id: ids } });
  }

  async addFavorite(userId, propertyId) {
    const property = await Property.findByPk(propertyId);
    if (!property) {
      throw new Error('Недвижимость не найдена');
    }

    const [fav] = await Favorites.findOrCreate({
      where: { userId, propertyId },
    });
    return fav;
  }

  async removeFavorite(userId, propertyId) {
    await Favorites.destroy({ where: { userId, propertyId } });
    return true;
  }
}

module.exports = PropertyService;
