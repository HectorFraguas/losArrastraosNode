var express = require('express');
var router = express.Router();

const socioModel = require('../models/socio')


// http://localhost:3000/socios
router.get('/', (req,res) => {
    socioModel.getAll((err, rows) => {
        res.json(rows)
    })
})

// http://localhost:3000/socios/new
router.post('/new', (req, res) => {
    // console.log(req.body)
    socioModel.create(req.body, (err, result) => {
        if(err) return console.log(err.message)
        res.json(result)
    })
})

// http://localhost:3000/socios/delete/??
router.get('/delete/:id', (req, res) => {
    // console.log(req.params)
    socioModel.getDelete(req.params.id, (err, rows) => {
        res.json(rows)
    })
})


module.exports = router;
