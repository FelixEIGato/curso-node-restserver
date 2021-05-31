const { response, request } = require('express');
const { Categoria } = require('../models');

const validarCategoria = async ( req = request, res = response, next ) => {

    const { categoria } = req.body;

    const query = categoria.toUpperCase();

    try {
        const categoriaDB = await Categoria.findOne( {nombre: query} );

        console.log(categoriaDB)

        if( !categoriaDB ){
            return res.status(401).json({
                msg: `La categoria ${categoria} no existe`
            })
        }

        if( !categoriaDB.estado ){
            return res.status(401).json({
                msg: 'La categoria está con estado: false'
            })
        }

        req.categoria = categoriaDB;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Error en la consulta'
        })
    }

    



}

module.exports = {
    validarCategoria
}