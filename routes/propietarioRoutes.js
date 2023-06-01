const { Router } = require('express');

const route = Router();

const { getPropietario, postPropietario } = require('../controllers/propietarioController');

route.get('/', getPropietario);
route.post('/', postPropietario);

module.exports = route;