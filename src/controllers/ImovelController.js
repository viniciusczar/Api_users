const Imovel = require('../models/Imovel');
const User = require('../models/User');

module.exports = {
  async created(req, res) {
    const { id } = req.params;
    const { cep, numero, complemento, valor, quantidade_quartos, disponivel } = req.body;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.send("User not found").status(403);
      }
      const imovel = await Imovel.create({
        user_id: id, cep, numero, complemento, valor, quantidade_quartos, disponivel
      });
      return res.json(imovel).status(200);
    } catch (error) {
      return res.send("Tente novamente!").status(401);
    }
  },

  async listener(req, res) {
    const { id } = req.params;

    try {
      const imoveis = await Imovel.findAll({
        where: {
          user_id: id
        }
      });
      if (!imoveis) {
        return res.send("Não há imoveis").status(403);
      }
      return res.json(imoveis).status(200);
    } catch (error) {
      return res.send("Tente novamente!").status(401);
    }
  },
  async find(req, res) {
    const { im_id } = req.params;

    try {
      const imovel = await Imovel.findOne({
        where: {
          id: im_id
        }
      });
      if (!imovel) {
        return res.send("Não há imóvel").status(403);
      }
      return res.json(imovel).status(200);
    } catch (error) {
      return res.send("Tente novamente!").status(401);
    }
  },

  async updated(req, res) {
    const { im_id } = req.params;
    const { cep, numero, complemento, valor, quantidade_quartos, disponivel } = req.body;

    try {
      if (await Imovel.update({
        cep, numero, complemento, valor, quantidade_quartos, disponivel
      }, {
        where: {
          id: im_id,
        }
      })) {
        return res.send("Atualizado!").status(200);
      }
      return res.send('Não encontrado imóvel para este ID');
    } catch (error) {
      return res.send("Tente novamente!").status(401);
    }
  },

  async deleted(req, res) {
    const im_id = req.params;

    try {
      if (await Imovel.destroy({
        where: {
          id: im_id
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
