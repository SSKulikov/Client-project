const { User } = require('../../db/models');
const bcrypt = require('bcrypt');

class AuthService {
  async registration({ name, email, password }) {
    if (!name || !email || !password) {
      throw new Error('Email or password is not correct');
    }
    const hashpass = await bcrypt.hash(password, 10);

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, hashpass },
    });

    if (!created) {
      throw new Error('This email is taken');
    }

    const plainUser = user.get();

    delete plainUser.hashpass;

    return plainUser;
  }

  async login({ email, password }) {
    const user = await User.findOne({ where: { email } });
    console.log(user);

    if (!user) {
      throw new Error('need more information');
    }
    console.log(password);
    console.log(user.hashpass);

    const valid = await bcrypt.compare(password, user.hashpass);
    if (!valid) {
      throw new Error('Email or password is not correct');
    }

    const plainUser = user.get();
    delete plainUser.hashpass;
    return plainUser;
  }
}

module.exports = AuthService;
