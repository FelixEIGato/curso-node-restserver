const Role = require("../models/role");
const Usuario = require("../models/usuario");

let esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no está registrado en la BD`)
    }
}

 //Verificar si el correo existe
let esEmailValido = async ( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ) {
        throw new Error(`El rol ${correo} ya está registrado` );
    }   
}
   
let existeUsuarioPorId = async ( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ) {
        throw new Error( `El id no existe ${id}` );
    }   
}



module.exports = {
    esRoleValido,
    esEmailValido,
    existeUsuarioPorId
}