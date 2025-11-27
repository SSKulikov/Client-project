const { Message, Property, User } = require('../../db/models');

class MessageController {
  getMessages = async (req, res) => {
    try {
      const { user } = res.locals;
      
      const messages = await Message.findAll({
        where: { userId: user.id },
        include: [
          {
            model: Property,
            attributes: ['type', 'addres', 'price']
          }
        ],
        order: [['createdAt', 'DESC']] 
      });

      return res.status(200).json(messages);
    } catch (error) {
      console.error('Ошибка получения сообщений:', error);
      res.status(500).json({ error: 'Ошибка получения сообщений' });
    }
  };

  sendMessage = async (req, res) => {
    try {
      const { user } = res.locals;
      const { propertyId, message, propertyType, propertyAddress, propertyPrice } = req.body;

      console.log('Получено сообщение:', { propertyId, message, propertyType, propertyAddress, propertyPrice }); 

      const property = await Property.findByPk(propertyId);
      if (!property) {
        return res.status(404).json({ error: 'Объект недвижимости не найден' });
      }

      const newMessage = await Message.create({
        propertyId,
        userId: user.id,
        message,
        propertyType: propertyType || property.type,
        propertyAddress: propertyAddress || property.addres,
        propertyPrice: propertyPrice || property.price.toString(),
       
      });

      console.log('✅ Сообщение создано в БД:', newMessage.id); 
      const messageWithDetails = await Message.findByPk(newMessage.id, {
        include: [
          {
            model: Property,
            attributes: ['type', 'addres', 'price']
          }
        ]
      });

      return res.status(201).json(messageWithDetails);
    } catch (error) {
      console.error('❌ Ошибка отправки сообщения:', error);
      res.status(500).json({ error: 'Ошибка отправки сообщения: ' + error.message });
    }
  };

  deleteMessage = async (req, res) => {
    try {
      const { user } = res.locals;
      const { id } = req.params;

      const message = await Message.findOne({
        where: { id, userId: user.id }
      });

      if (!message) {
        return res.status(404).json({ error: 'Сообщение не найдено' });
      }

      await Message.destroy({ where: { id } });

      return res.status(204).send();
    } catch (error) {
      console.error('Ошибка удаления сообщения:', error);
      res.status(500).json({ error: 'Ошибка удаления сообщения' });
    }
  };

  deleteAllMessages = async (req, res) => {
    try {
      const { user } = res.locals;

      await Message.destroy({ where: { userId: user.id } });

      return res.status(204).send();
    } catch (error) {
      console.error('Ошибка удаления всех сообщений:', error);
      res.status(500).json({ error: 'Ошибка удаления всех сообщений' });
    }
  };
}

module.exports = MessageController;