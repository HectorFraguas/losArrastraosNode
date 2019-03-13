const db = require('../db')


let getAll = (done) => {
    db.get().query('select * from rutas', (err, rows) => {
        if(err) return done(err)
        done(null, rows)
    })
}

let getRuta = (id, done) => {
    db.get().query('SELECT r.id AS idRuta, r.provincia, r.salida, r.llegada, r.descripcion, r.tipoRuta, r.latitud, r.longitud, r.fk_usuarios, u.id, u.nombre, u.usuario, u.email, u.imagen, u.token from rutas as r, usuarios as u WHERE r.id = ? AND r.fk_usuarios = u.id', [id], (err, result) => {
        if(err) return done(err)
        done(null, result) 
    })
}

let filtroRutas = (provincia, tipoRuta, done) => {
    db.get().query('select * from rutas where provincia = ? and tipoRuta = ?', [provincia, tipoRuta], (err,result) => {
        if(err) return done(err)
        done(null, result)
    })
}

let createRuta = ({titulo, provincia, salida, llegada, descripcion, tipoRuta, latitud, longitud, token}, done) => {
        db.get().query('insert into rutas values (NULL, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT id FROM usuarios WHERE token = ?));', [titulo, provincia, salida, llegada, descripcion, tipoRuta, latitud, longitud, token], (err, result) => {
            if(err) return done(err)
            done(null, result)
        })
    }

let deletedRuta = (id, done) => {
    db.get().query('DELETE FROM rutas WHERE id = ?', [id], (err, result) => {
        if(err) return done(err)
        done(null, result)
    })
}

let agregarComentarioRuta = ({token, fk_ruta, comentario}, done) => {
    db.get().query('insert INTO comentarios (comentario, fk_ruta, fk_usuario) VALUES (?, ?, (SELECT id FROM usuarios WHERE token = ?))', [comentario, fk_ruta, token], (err, result) => {
        if(err) return done(err)
        done(null, result)
    })
}

let recuperarComentarios = (id, done) => {
    db.get().query('SELECT c.comentario, u.usuario as usuarioComentario, u.token as tokenUsuario FROM comentarios AS c JOIN usuarios AS u WHERE c.fk_ruta = ? AND c.fk_usuario = u.id', [id], (err, result) => {
        if(err) return done(err)
        done(null, result)
    })
}


module.exports = {
    getAll: getAll,
    createRuta: createRuta,
    deleteRuta: deletedRuta,
    filtroRutas: filtroRutas,
    getRuta: getRuta,
    agregarComentarioRuta: agregarComentarioRuta,
    recuperarComentarios: recuperarComentarios
}