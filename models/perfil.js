const db = require('../db')

let getPerfil = (token, done) => {
    console.log(token)
    db.get().query('SELECT id, nombre, usuario, email, imagen FROM usuarios WHERE token= ?', [token], (err,result) => {
        if(err) return done(err)
        done(null, result)
    })
}

let updatePerfil = ({token, email}, done) => {
   
    db.get().query('update usuarios set email = ? where token = ?', [email, token], (err,result) => {
        if(err) return done(err)
        done(null, result)
    })
}

let updateFotoPerfil = ({imagen, token}, done) => {
    db.get().query('update usuarios set imagen = ? where token = ?', [imagen, token], (err, result) => {
        if(err) return done(err)
        done(null, result)
    })
}


module.exports = {
    getPerfil: getPerfil,
    updatePerfil: updatePerfil,
    updateFotoPerfil: updateFotoPerfil
}