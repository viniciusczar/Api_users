const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const salt = bcrypt.genSaltSync(10);

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 14400,
  })
}

module.exports = {
  async created(req, res) {
    const { cpf, name, email, password } = req.body;
    try {
      const user = await User.findOne({
        where: { cpf: cpf },
        attributes: {
          exclude: ['token', 'password']
        }
      });
      if (!user) {
        const hash = bcrypt.hashSync(password, salt);
        const create = await User.create({
          cpf: cpf,
          email: email,
          password: hash,
          name: name
        });

        return res.status(200).json(create);
      }
      return res.send("Falha. Usuário já existe!").status(400);
    }
    catch (error) {
      return res.send("Tente novamente!").status(401);
    }
  },
  async listener(req, res) {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ['password', 'token']
        }
      });
      return res.json(user).status(200);
    } catch (error) {
      return res.send("Tente novamente!").status(401);
    }
  },
  async find(req, res) {
    const id = req.params.id;
    try {
      const user = await User.findOne({
        where: { id: id },
        attributes: {
          exclude: ['password', 'token']
        }
      });

      if (user) {
        return res.json(user).status(200);
      }
      return res.send("Not found!").status(403);

    } catch (error) {
      return res.send("Tente novamente!").status(401);
    }
  },

  async updated(req, res) {
    const id = req.params.id;
    const { name, email, password } = req.body;
    try {
      if (await User.update({ name, email, password },
        {
          where: {
            id: id
          }
        })) {
        return res.send("Updated!").status(200);
      }
      return res.send("Failed!").status(403);
    } catch (error) {
      return res.send("Tente novamente!").status(401);
    }
  },
  async deleted(req, res) {
    const id = req.params.id;

    try {
      if (await User.destroy({
        where: {
          id: id
        }
      })) {
        return res.send("Deleted!").status(200);
      }
      return res.send("failed!").status(200);
    } catch (error) {
      return res.send("Tente novamente!").status(401);
    }
  }

}