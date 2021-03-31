
// creacion del modelo de usuario
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        require: [true, 'El nombre es requerido']
    },
    correo: {
        type: String,
        require: [true, 'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'La contraseña es requerido']
    },
    imagen: {
        type: String,
    },
    rol: {
        type: String,
        require: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

// metodos para el modelo
UsuarioSchema.methods.toJSON = function() {
    // explicito los que sacare y el resto los envio a la variable usuario
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

// mongoose agrega por defecto la s al final para la coleccion(o tabla)
// exportamos el schema del usuario
module.exports = model( 'Usuario', UsuarioSchema );
