const { Router } = require('express')
const autorController = require('../controllers/autorController')
const router = Router()

router.get('/', autorController.obtenerAutores)
router.get('/:id', autorController.obtenerAutor)
router.post('/', autorController.crearAutor)
router.put('/:id', autorController.editarAutor)
router.delete('/:id', autorController.eliminarAutor)

// Rutas libros
router.get('/:id/libros', autorController.obtenerLibros)
router.post('/:id/libros', autorController.agregarLibro)
router.delete('/:id/libros/:libroId', autorController.eliminarLibro)
router.put('/:id/libros/:libroId', autorController.modificarLibro)

module.exports = router
