const { Schema, model } = require('mongoose');

const PropietarioSchema = Schema({
    documento:{
        type: Number,
        required: [true, 'El documento es obligatorio']
    },
    tipoDocumento:{
        type: String,
        enum: ['CC', 'CE', 'NIT'],
        required: [true, 'El tipo de documento es obligatorio']
    },
    fechaNacimiento:{
        type: Date,
        validate:{
            validator: function(fecha){
                console.log(new Date(fecha))
                console.log(new Date())
                console.log(new Date(fecha) < new Date())
                return new Date(fecha) < new Date();
            },
            message: props => `La fecha de nacimiento ${props.value} no es válida`
        },
        required: [true, 'La fecha de nacimiento es obligatoria']
    },
    celular:{
        type: Number,
        required: [true, 'El celular es obligatorio']
    }
})

module.exports = model('Propietario', PropietarioSchema);