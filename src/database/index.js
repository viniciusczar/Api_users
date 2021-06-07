const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/User');
const Imovel = require('../models/Imovel');

const connection = new Sequelize(dbConfig);

User.init(connection);
Imovel.init(connection);

Imovel.associate(connection.models);

module.exports = connection;