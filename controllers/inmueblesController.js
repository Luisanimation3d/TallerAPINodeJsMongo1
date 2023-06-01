const { response } = require('express');
const Inmueble = require('../models/InmueblesModel');

const getInmuebles = async (req, res = response) => {
	let mensaje = '';
	try {
		const inmuebles = await Inmueble.find();
		mensaje = 'Consulta exitosa';
		res.json({
			ok: true,
			mensaje,
			inmuebles,
		});
	} catch (error) {
		mensaje = 'Error en la consulta';
		res.json({
			ok: false,
			mensaje,
		});
	}
};

const postInmueble = async (req, res = response) => {
	let mensaje = '';
	const body = req.query;
	const inmueble = new Inmueble(body);
	try {
		await inmueble.save();
		mensaje = 'Inmueble creado exitosamente';
		res.json({
			ok: true,
			mensaje,
		});
	} catch (error) {
		mensaje = 'Error al crear el inmueble';
		res.json({
			ok: false,
			mensaje,
		});
	}
};

module.exports = {
	getInmuebles,
	postInmueble,
};
