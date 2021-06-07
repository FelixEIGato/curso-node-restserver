const { response } = require("express");
const { Categoria, Role, Usuario, Producto } = require("../models");
// const Role = require("../models/role");
// const Usuario = require("../models/usuario");

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no está registrado en la BD`)
    }
}

 //Verificar si el correo existe
const esEmailValido = async ( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ) {
        throw new Error(`El rol ${correo} ya está registrado` );
    }   
}
   
const existeUsuarioPorId = async ( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ) {
        throw new Error( `El id no existe ${id}` );
    }   
}

const existeCategoriaPorId = async ( id ) => {
    const categoria = await Categoria.findById(id);
    if( !categoria ) {
        throw new Error( `El id no existe ${id}` );
    }   
}

// const existeCategoriaPorNombre = async(nombre) => {

//     nombre = nombre.toUpperCase();
//     const categoria = await Categoria.findOne( {nombre} );
//     if( !categoria ){
//         throw new Error(`La categoria ${nombre} no existe`);
//     }
// }

const existeProductoPorId = async ( id ) => {
    const existeProducto = await Producto.findById(id);
    if( !existeProducto ) {
        throw new Error( `El id no existe ${id}` );
    }   
}

/*
    Validar COlecciones permitidas
*/

const coleccionesPermitidas = async ( coleccion = '', colecciones = [] ) => {
    
    const incluida = colecciones.includes( coleccion );
    if( !incluida ){
        throw new Error(`La colección ${coleccion} no es permitida - ${colecciones}`);
    }

    return true;
}

module.exports = {
    esRoleValido,
    esEmailValido,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}