/* eslint-disable class-methods-use-this */
const cookieConfig = require('../config/cookie.config');
const generateTokens = require('../utils/generateTokens');
const jwt = require('jsonwebtoken');

class AuthController {
  #authService;

  constructor(authService) {
    this.#authService = authService;
  }

  refresh = async (req, res) => {
    try {
      const { refreshToken: oldRefreshToken } = req.cookies;

      const { user } = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET);

      const { accessToken, refreshToken } = generateTokens({ user });

      res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user, accessToken });
    } catch (err) {
      console.log(err);
      res.sendStatus(401);
    }
  };

  registration = async (req, res) => {
    const user = await this.#authService.registration(req.body);

    const { accessToken, refreshToken } = generateTokens({ user });

    res
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .json({ user, accessToken })
      .status(200);
  };

  login = async (req, res) => {
    const user = await this.#authService.login(req.body);

    const { accessToken, refreshToken } = generateTokens({ user });

    res
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .json({ user, accessToken });
  };

  // eslint-disable-next-line class-methods-use-this
  logout = (req, res) => {
    res.clearCookie('refreshToken').sendStatus(204);
  };
}

module.exports = AuthController;
