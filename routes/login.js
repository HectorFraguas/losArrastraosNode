var express = require('express');
var router = express.Router();

let bcrypt = require("bcrypt")

const loginModel = require('../models/login')
let tokengn = require('tokengn')

// http://localhost:3000/login/login
router.post('/login', (req, res) => {
    loginModel.login(req.body.usuario, (err, result) => {
        if(err) return console.log(err.message)
        if(result.length == 0){
            return res.json({error: 'Usuario y/o contraseña es incorrecto'})}
        if(result.length == 1){
            let correcto = bcrypt.compareSync(req.body.clave, result[0].clave)
            if(correcto == true){
                let token = tokengn({})
                loginModel.insertToken(token, result[0].id,(err, result) => {
                    if (err) console.log(err)
                    return res.json(token)
                })
            }else{
                return res.json({error: 'Usuario y/o contraseña es incorrecto'})
            }
        }
    })
})

// http://localhost:3000/login/new
router.post('/new', (req, res) => {
    loginModel.createRegistro(req.body, (err, result) => {
        // console.log(req.body)
        // console.log(err)
        if(err) return res.json({error: 'Usuario y/o email ya estan registrados' })
        res.json(result)
    })
})


module.exports = router;
