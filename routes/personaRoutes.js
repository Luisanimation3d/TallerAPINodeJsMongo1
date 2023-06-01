const {Router} = require('express');
const routes = Router();

const {getPersona, postPersona} = require('../controllers/personasController');

routes.get('/', getPersona);
routes.post('/', postPersona);

module.exports = routes;
