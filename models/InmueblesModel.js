const { Schema, model } = require('mongoose');

const InmuebleSchema = Schema({
    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria']
    },
    tipoInmueble:{
        type: String,
        enum: ['Apartamento', 'Casa', 'Local'],
        required: [true, 'El tipo de inmueble es obligatorio']
    },
    valorArriendo: {
        type: Number,
        validate:{
            validator: function(valor){
                return valor > 800000 && valor < 4000000;
            },
            message: props => `El valor del arriendo ${props.value} no es válido`
        },
        required: [true, 'El valor del arriendo es obligatorio']
    },
    ciudad:{
        type: String,
        enum: ['Medellín', 'Bello', 'Envigado'],
        required: [true, 'La ciudad es obligatoria']
    }

});

module.exports = model('Inmueble', InmuebleSchema);