const {Router} = require('express');
const routes = Router();

const {getPersona, postPersona, putPersona, deletePersona} = require('../controllers/personasController');

routes.get('/', getPersona);
routes.post('/', postPersona);
routes.put('/', putPersona);
routes.delete('/', deletePersona);

module.exports = routes;
