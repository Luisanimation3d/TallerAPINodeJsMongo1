const { Router } = require('express');
const route = Router();

const { getInmuebles, postInmueble, putInmueble, deleteInmueble } = require('../controllers/inmueblesController');

route.get('/', getInmuebles);
route.post('/', postInmueble);
route.put('/', putInmueble);
route.delete('/', deleteInmueble);

module.exports = route;
