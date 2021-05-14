const { response } = require('express');

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

const usuarioPost = (req, res) => {

    //recibimos la data que envia el front
    const { nombre, edad } = req.body;


    res.json({
        "msg": "post API - controlador",
        nombre,
        edad
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