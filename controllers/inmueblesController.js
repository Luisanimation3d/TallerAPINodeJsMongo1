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
			error
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
			error
		});
	}
};


const putInmueble = async (req, res = response) => {
	let mensaje = '';
	const {direccion, ...body} = req.query;
	try {
		await Inmueble.findOneAndUpdate({direccion}, {...body})
		mensaje = 'Inmueble actualizado exitosamente';
		res.json({
			ok: true,
			mensaje,
		});
	} catch (error) {
		mensaje = 'Error al actualizar el inmueble';
		res.json({
			ok: false,
			mensaje,
			error
		});
	}
};


const deleteInmueble = async (req, res = response) => {
	let mensaje = '';
	const {direccion} = req.query;
	try {
		await Inmueble.findOneAndDelete({direccion})
		mensaje = 'Inmueble eliminado exitosamente';
		res.json({
			ok: true,
			mensaje,
		});
	} catch (error) {
		mensaje = 'Error al eliminar el inmueble';
		res.json({
			ok: false,
			mensaje,
			error
		});
	}
};



module.exports = {
	getInmuebles,
	postInmueble,
	putInmueble,
	deleteInmueble,
};
