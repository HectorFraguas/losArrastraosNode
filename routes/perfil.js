var express = require('express');
var router = express.Router();

const perfilModel = require('../models/perfil')


// http://localhost:3000/perfil
router.post('/', (req, res) => {
    console.log(req.body.token)
    perfilModel.getPerfil(req.body.token ,(err, rows) => {
        if (err) console.log(err)
        res.json(rows)
    })
})

// http://localhost:3000/perfil/update
router.post('/update', (req, res) => {
    perfilModel.updatePerfil({
        token: req.body.token, 
        email: req.body.email,
        imagen: req.body.imagen
    }, (err, rows) => {
        if (err) console.log(err)
        console.log(req.body)
        res.json(rows)
    })
})

// http://localhost:3000/perfil/update/updatefotoperfil
router.post('/update/updatefotoperfil', (req, res) => {
    console.log(req.body)
    perfilModel.updateFotoPerfil({
        imagen: req.body.imagen, 
        token: req.body.token
    }, (err, rows) => {
        if (err) console.log(err)
        res.json(rows)
    })
})


module.exports = router;
