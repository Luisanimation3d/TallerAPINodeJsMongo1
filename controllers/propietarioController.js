const { response } = require('express');
const Propietario = require('../models/PropietarioModel');

const getPropietario = async (req, res = response) => {
	let mensaje = '';
	try {
		const propietarios = await Propietario.find();
		mensaje = 'Consulta exitosa';
		res.json({
			ok: true,
			mensaje,
			propietarios,
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

const postPropietario = async (req, res = response) => {
	let mensaje = '';
	const body = req.query;
	const propietario = new Propietario(body);
	try {
		await propietario.save();
		mensaje = 'Propietario creado exitosamente';
		res.json({
			ok: true,
			mensaje,
		});
	} catch (error) {
		mensaje = 'Error al crear el propietario';
		res.json({
			ok: false,
			mensaje,
			error
		});
	}
};

const putPropietario = async (req, res = response) => {
	let mensaje = '';
	const {documento, ...body} = req.query;
	try {
		await Propietario.findByIdAndUpdate({documento}, {...body});
		mensaje = 'Propietario actualizado exitosamente';
		res.json({
			ok: true,
			mensaje,
		});
	} catch (error) {
		mensaje = 'Error al actualizar el propietario';
		res.json({
			ok: false,
			mensaje,
			error
		});
	}
};

const deletePropietario = async (req, res = response) => {
	let mensaje = '';
	const {documento} = req.query;
	try {
		await Propietario.findOneAndDelete({documento})
		mensaje = 'Propietario eliminado exitosamente';
		res.json({
			ok: true,
			mensaje,
			error
		});
	} catch (error) {
		mensaje = 'Error al eliminar el propietario';
		res.json({
			ok: false,
			mensaje,
			error
		});
	}
};

module.exports = {
	getPropietario,
	postPropietario,
	putPropietario,
	deletePropietario
};
