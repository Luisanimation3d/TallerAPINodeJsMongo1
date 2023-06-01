const { Router } = require('express');
const route = Router();

const { getInmuebles, postInmueble } = require('../controllers/inmueblesController');

route.get('/', getInmuebles);
route.post('/', postInmueble);

module.exports = route;
