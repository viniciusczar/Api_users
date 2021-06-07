const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const salt = bcrypt.genSaltSync(10);
const authConfig = require('../config/auth.json');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 14400,
  })
}

module.exports = {
  async access(req, res) {
    const { cpf, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          cpf: cpf
        }
      });
      if (!user) {
        return res.send("Não encontrado nenhum usuário para esse CPF").status(403);
      }
      if (await bcrypt.compare(password, user.password)) {
        user.password = undefined;
        let token = generateToken({ id: user.id });
        await User.update({
          token: token
        }, {
          where: { id: user.id }
        });
        return res.send({ user, token }).status(200);
      }
      return res.status(401).send('Não autorizado!');
    } catch (error) {
      return res.send("Please, try again!")
    }
  }
}