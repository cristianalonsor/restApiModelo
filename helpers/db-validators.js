const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no esta en la BD`);
    }
};

const emailExiste = async ( correo ) => {

    // verificar existencia de correro
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ){
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }

};

const existeUsuarioPorId = async ( id ) => {

    // verificar existencia de correro
    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario ){
        throw new Error(`El id ${ id } no es valido`);
    }

};

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}