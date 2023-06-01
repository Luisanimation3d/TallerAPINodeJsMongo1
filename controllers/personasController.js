const { response } = require('express');
const Persona = require('../models/PersonasModel');

function getEdad(fecha) {
    if(!fecha) return 0
	const fechaNacimiento = new Date(fecha);
	const fechaActual = new Date();
	let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
	const mes = fechaActual.getMonth() - fechaNacimiento.getMonth();
	if (
		mes < 0 ||
		(mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())
	) {
		edad--;
	}

    return edad
}

const getPersona = async (req, res = response) => {
	let mensaje = '';
	try {
		const personas = await Persona.find();
		mensaje = 'Consulta exitosa';
		let promedioEdad = 0;
		personas?.forEach((persona) => {
			promedioEdad += getEdad(persona.fechaNacimiento);
		});
        promedioEdad = personas.length > 0 ? promedioEdad / personas.length : 0;
		res.json({
			ok: true,
			mensaje,
			personas,
            promedioEdad
		});
	} catch (error) {
		mensaje = 'Error en la consulta';
		res.json({
			ok: false,
			mensaje,
		});
	}
};

const postPersona = async (req, res = response) => {
    let mensaje = '';
    const body = req.query;
    const persona = new Persona(body);
    try {
        await persona.save();
        mensaje = 'Persona creada exitosamente';
        res.json({
            ok: true,
            mensaje,
        });
    } catch (error) {
        mensaje = 'Error al crear la persona';
        res.json({
            ok: false,
            mensaje,
        });
    }
}

module.exports = {
	getPersona,
    postPersona
};
