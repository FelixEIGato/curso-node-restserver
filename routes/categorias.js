const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId, esRoleValido } = require('../helpers/db-validators');

const { validarJWT, validarCampos, tieneRole } = require('../middlewares');

const router = Router();

/*
    {{ur}}/api/categorias
*/


//Obtener todas las categorias - público
router.get('/', obtenerCategorias );


//Obtener una categoria por id - público
//middleware personalidado para validar el id
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],obtenerCategoria);

//Crear categoria - privado - cualquier persona con un token válido
router.post('/:id', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    validarCampos
], crearCategoria );

//Actualizar - privado - cualqueira con token valido
router.put('/:id', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],actualizarCategoria);

//Borrar una categoria - Admin
router.delete('/:id', [ 
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],borrarCategoria);

module.exports = router;