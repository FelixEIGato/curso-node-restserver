const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerProductos, crearProducto, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeProductoPorId } = require('../helpers/db-validators');

const { validarJWT, validarCampos, tieneRole } = require('../middlewares');
const { validarCategoria } = require('../middlewares/validar-categoria');


const router = Router();


//Obtener todos los productos
router.get('/', obtenerProductos );

router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],obtenerProducto);

router.post('/:id', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    // check( 'categoria', ).custom( existeCategoriaPorNombre ),
    validarCategoria,
    validarCampos
], crearProducto );

router.put('/:id', [
    validarJWT,
    validarCategoria,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto);

router.delete('/:id', [ 
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
],borrarProducto);


module.exports = router;