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
			error
        });
    }
}

const putPersona = async (req, res) => {
	let mensaje = ''
	let {nombreCompleto, ...body} = req.query
	// console.log(nombreCompleto, {...body})
	try{
		await Persona.findOneAndUpdate({nombreCompleto}, {...body})
		mensaje = 'Persona actualizada exitosamente'
		res.json({
            ok: true,
            mensaje,
        });
	}catch(error){
		mensaje = 'Error al actualizar la persona';
        res.json({
            ok: false,
            mensaje,
			error
        });
	}
}

const deletePersona = async (req, res) => {
	let mensaje = ''
	let {nombreCompleto} = req.query
	try{
		await Persona.findOneAndDelete({nombreCompleto})
		mensaje = 'Persona eliminada exitosamente'
		res.json({
            ok: true,
            mensaje,
        });
	}catch(error){
		mensaje = 'Error al eliminar la persona';
        res.json({
            ok: false,
            mensaje,
			error
        });
	}
}

module.exports = {
	getPersona,
    postPersona,
	putPersona,
	deletePersona
};
