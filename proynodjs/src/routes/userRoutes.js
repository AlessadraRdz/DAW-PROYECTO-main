const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();


//LOGEO
router.get('/login', userController.login);
router.post('/confirma', userController.confirma);
//CARRITO
router.post('/carrito', userController.carrito);
router.get('/carrito', userController.carritoView);
//CRUD DE USUARIOS
router.get('/listar', userController.listar);
router.get('/agregar', userController.agregar);
router.post('/agregar', userController.guardar);
router.post('/eliminar', userController.eliminar);
router.get('/editar/:id', userController.editar);
router.post('/editar/:id', userController.actualizar);
//CRUD DE LIBROS
router.get('/listar_libro', userController.listar_libro);
router.get('/listar_libros', userController.listar_libros);
router.get('/agregar_libro', userController.agregar_libro);
router.post('/agregar_libro', userController.guardar_libro);
router.post('/eliminar_libro', userController.eliminar_libro);
router.get('/editar_libro/:id', userController.editar_libro);
router.post('/editar_libro/:id', userController.actualizar_libro);


module.exports = router;