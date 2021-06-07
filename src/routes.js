const express = require('express');
const UserController = require('./controllers/UserController');
const AuthenticationController = require('./controllers/AuthenticationController');
const ImovelController = require('./controllers/ImovelController');
const authMiddleware = require('./middlewares/auth');


const routes = express.Router();

routes.get('/users', UserController.listener); //Listar todos
routes.post('/users', UserController.created); // Criar
routes.get('/users/:id', UserController.find); //Buscar
routes.put('/users/:id', UserController.updated); //Editar
routes.delete('/users/:id', UserController.deleted); //Deletar

routes.get('/users/:id/imoveis', ImovelController.listener); //Listar todos
routes.post('users/:id/imoveis', ImovelController.created); // Criar
routes.get('users/imoveis/:im_id', ImovelController.find); //Buscar
routes.put('users/imoveis/:im_id', ImovelController.updated); //Editar
routes.delete('users/imoveis/:im_id', ImovelController.deleted); //Deletar

routes.get('/login', authMiddleware, AuthenticationController.access); //Login


module.exports = routes;