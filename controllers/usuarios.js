const { response } = require('express');
const bcrypt  = require('bcryptjs');

const Usuario = require('../models/usuario');
const { findById } = require('../models/usuario');

const usuariosGet = async (req = request, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res = response ) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra base de datos

    if( password ) {
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt );
    }

    await Usuario.findByIdAndUpdate( id, resto );
    const usuario = await Usuario.findById(id);

    res.json({
        "msg": `Se actualizo con éxito el id: ${ id }`,
        "content": usuario
    });
}

const usuarioPost = async (req, res = response) => {

    

    //recibimos la data que envia el front
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });


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

const usuarioDelete = async (req, res) => {

    const { id } = req.params;


    //Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false })

    res.json({
        "msg": "delete API - controlador",
        usuario
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