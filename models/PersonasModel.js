const { Schema, model } = require('mongoose');

const PersonasSchema = Schema({
    documento:{
        type: Number,
        required: [true, 'El documento es obligatorio']
    },
    nombreCompleto:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    genero:{
        type: String,
        enum: ['M', 'F'],
        required: [true, 'El género es obligatorio']
    },
    fechaNacimiento:{
        type: Date,
        validate:{
            validator: function(fecha){
                const fechaNacimiento = new Date(fecha);
                const fechaActual = new Date();
                let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
                const mes = fechaActual.getMonth() - fechaNacimiento.getMonth();
                if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
                    edad--;
                }
                return edad >= 18;
            },
            message: props => `La fecha de nacimiento ${props.value} no es válida`
        },
        required: [true, 'La fecha de nacimiento es obligatoria']
    }
})

module.exports = model('Persona', PersonasSchema);