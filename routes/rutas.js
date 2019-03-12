var express = require('express');
var router = express.Router();

const rutasModel = require('../models/rutas')


// http://localhost:3000/rutas/all
router.get('/all', (req,res) => {
    rutasModel.getAll((err, rows) => {
        console.log(rows)
        res.json(rows)
    })
})

// http://localhost:3000/ruta/:id
router.get('/:id', (req, res) => {
    rutasModel.getRuta(req.params.id, (err,rows) => {
        res.json(rows[0])
    })
})


// http://localhost:3000/rutas/filtro
router.post('/filtro', (req,res) => {
    rutasModel.filtroRutas(req.body.provincia, req.body.tipoRuta, (err,rows) => {
        res.json(rows)
    })
})


// http://localhost:3000/rutas/new
router.post('/new', (req, res) => {
    console.log(req.body)
    rutasModel.createRuta(req.body, (err, result) => {
        if(err) return console.log(err.message)
        res.json(result)
    })
})

// http://localhost:3000/rutas/delete/id
router.get('/delete/:id', (req, res) => {
    rutasModel.deleteRuta(req.params.id, (err, rows) => {
        res.json(rows)
    })
})

module.exports = router;