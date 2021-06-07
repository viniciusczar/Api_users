const { Model, DataTypes } = require('sequelize');

class Imovel extends Model {
  static init(sequelize) {
    super.init({
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      cep: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      numero: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      complemento: {
        type: DataTypes.STRING,
        allowNull: true
      },
      valor: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      quantidade_quartos: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      disponivel: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' });
  }

}

module.exports = Imovel;