const db = require('../db')
let bcrypt = require("bcrypt")


let login = (usuario, done) => {

    db.get().query('select * from usuarios where usuario = ?', [usuario], (err,result) => {
        if(err) return done(err)
        done(null, result)
    })
}

let insertToken = (token, usuario, done) => {
    
    db.get().query('update usuarios set token=? where id=?', [token, usuario], (err,result) => {
        if(err) return done(err)
        done(null, result)
    })
}

let createRegistro = ({nombre, usuario, clave, email}, done) => {
    // console.log(nombre, usuario)

    let claveEncriptada = bcrypt.hashSync(clave, 10)

    db.get().query('insert into usuarios (nombre, usuario, clave, email) values (?, ?, ?, ?)', [nombre,  usuario, claveEncriptada, email], (err, result) => {
        if(err) return done(err)
        done(null, result)
    })
}

module.exports = {
    login: login,
    createRegistro: createRegistro,
    insertToken: insertToken
}