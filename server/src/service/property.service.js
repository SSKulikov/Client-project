const { Property } = require('../../db/models');

class PropertyService {
    async findAllProperties() {
        return Property.findAll()
    }

    async findProperty(id) {
        return Property.findByPk(id)
    }

    async createProperty(data) {
        return Property.create(data)
    }

    async updateCharacter(id, data) {
        const property = await Property.findByPk(id)
        if (!property) {
            return null
        }
        return property.update(data)
    }

    async deleteProperty(id) {
        await Property.destroy(id)
        return true
    }
}

module.exports = PropertyService