const Autor = require('../models/autor')

const obtenerAutores = async (req,res) => {
    try {
        const autores = await Autor.find().select('nombre nacionalidad -_id')
        res.status(200).json(autores)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const obtenerAutor = async (req, res) => {
    try {
        const id = req.params.id
        const autor = await Autor.findById(id)
        if(!autor){
            return res.status(404).json({message: 'No se encontro el autor'})
        }
        res.status(200).json(autor)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const crearAutor = async (req,res) => {
    try {
        const nuevoAutor = new Autor(req.body)
        await nuevoAutor.save()
        res.status(201).json(nuevoAutor)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const editarAutor = async (req, res) => {
    try {
        const autorActualizado = await Autor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!autorActualizado) {
            return res.status(404).json({ mensaje: 'Autor no encontrado' })
        }
        res.json({ mensaje: 'Autor actualizado', autor: autorActualizado })
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el autor', error })
    }
}

const eliminarAutor = async (req, res) => {
    try {
        const autorEliminado = await Autor.findByIdAndDelete(req.params.id)
        if (!autorEliminado) {
            return res.status(404).json({ mensaje: 'Autor no encontrado' })
        }
        res.json({ mensaje: 'Autor eliminado', autor: autorEliminado })
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el autor', error })
    }
}

const obtenerLibros = async (req,res) => {
    try {
        const id = req.params.id
        const autor = await Autor.findById(id)
        if(!autor){
            res.status(404).json({message: 'No existe el autor'})
        }
        res.status(200).json(autor.libros)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const agregarLibro = async (req,res) => {
    try {
        const id = req.params.id
        const autor = await Autor.findById(id)
        if(!autor){
            res.status(404).json({message: 'No existe el autor'})
        }
        const libro = req.body
        autor.libros.push(libro)
        await autor.save()
        res.status(201).json({
            message: 'Libro agregado con exito',
            libro
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const eliminarLibro = async (req,res) => {
    try {
        const id = req.params.id
        const autor = await Autor.findById(id)
        if(!autor){
            res.status(404).json({message: 'No existe el autor'})
        }
        const libroId = req.params.libroId
        const libro = autor.libros.id(libroId)
        if(!libro){
            res.status(404).json({message: 'No existe el libro'})
        }
        libro.deleteOne()
        await autor.save()
        res.status(200).json({message: 'Libro eliminado con exito'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const modificarLibro = async (req,res) => {
    try {
        const id = req.params.id
        const autor = await Autor.findById(id)
        if(!autor){
            res.status(404).json({message: 'No existe el autor'})
        }
        const libroId = req.params.libroId
        const libro = autor.libros.id(libroId)
        if(!libro){
            res.status(404).json({message: 'No existe el libro'})
        }
        const {titulo, fechaPublicacion, genero } = req.body
        libro.titulo = titulo
        libro.fechaPublicacion = fechaPublicacion
        libro.genero = genero
        await autor.save()
        res.status(200).json({
            message: 'Libro modificado con exito',
            libro
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    obtenerAutores,
    obtenerAutor,
    crearAutor,
    editarAutor,
    eliminarAutor,
    obtenerLibros,
    agregarLibro,
    eliminarLibro,
    modificarLibro
}