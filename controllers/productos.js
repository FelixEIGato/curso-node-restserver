const { response } = require('express');
const { Producto } = require('../models');

const obtenerProductos = async( req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, productos ] = await Promise.all([

        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
    ]);

    res.json({
        total,
        productos
    })
}

const obtenerProducto = async( req, res = response ) => {

    const { id } = req.params;
    const producto = await Producto.findById( id )
        .populate('usuario','nombre')
        .populate('categoria','nombre');

    res.json({
        producto
    })
}


const crearProducto = async ( req, res = response ) => {

    const { precio, descripcion } = req.body;

    const nombre = req.body.nombre.toUpperCase();
    
    const productoDB = await Producto.findOne({ nombre });
    
    if( productoDB ){
        res.status(400).json({
            msg: `La categoria ${productoDB.nombre} ya existe`
        });
    }

    //Generar la data a guardar

    const data = {
        nombre,
        usuario: req.usuario._id,
        precio,
        categoria: req.categoria._id,
        descripcion
    }

    console.log(data);
    const producto = new Producto( data );

    //Guardar DB
    await producto.save();

    res.json({
        data,
    })
}

const actualizarProducto = async ( req, res = response ) => {
    const { id } = req.params;
    const { usuario, categoria, ...data } = req.body;

    if( data.nombre ) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;
    data.categoria = req.categoria._id;

    const producto = await Producto.findByIdAndUpdate( id, data, { new: true });

    res.json({
        "msg": `Se actualizo con éxito el id: ${ id }`,
        "content": producto
    });

}

const borrarProducto = async ( req, res= response ) => {

    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate( id, { estado: false }, {new:true});

    res.json({
        producto
    })
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}