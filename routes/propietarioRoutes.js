const { Router } = require('express');

const route = Router();

const { getPropietario, postPropietario, putPropietario, deletePropietario } = require('../controllers/propietarioController');

route.get('/', getPropietario);
route.post('/', postPropietario);
route.put('/', putPropietario);
route.delete('/', deletePropietario);

module.exports = route;