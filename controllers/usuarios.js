const { response } = require('express');
const bcrypt  = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response ) => {

    const { q, nombre = "no name", apikey, page = 1, limit } = req.query;

    res.json({
        "msg": "get API - controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPut = (req, res = response ) => {

    const { id } = req.params;

    res.json({
        "msg": "put API - controlador",
        id
    })
}

const usuarioPost = async (req, res = response) => {

    

    //recibimos la data que envia el front
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ) {
        return res.status(400).json({ 
            msg: 'El correo ya está registrado'
         })
    }

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );
    

    //Guardar en BD
    await usuario.save();

    res.json({
        "msg": "post API - controlador",
        usuario
    })
} 

const usuarioDelete = (req, res) => {
    res.json({
        "msg": "delete API - controlador"
    })
} 

const usuarioPatch = (req, res) => {
    res.json({
        "msg": "patch API - controlador"
    })
} 


module.exports = {
    usuariosGet,
    usuariosPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch
}