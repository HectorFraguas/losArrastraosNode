const db = require('../db')


let getAll = (done) => {
    db.get().query('select u.token, s.id, s.nombrePersona, s.moto, s.cargo, s.foto  FROM socios as s, usuarios AS u WHERE u.id = 1', (err, rows) => {
        if(err) return done(err)
        done(null, rows)
    })
}

let create = ({nombre, moto, cargo, foto}, done) => {

    db.get().query('insert into socios values (null, ?, ?, ?, ?)', [nombre,  moto, cargo, foto], (err, result) => {
        if(err) return done(err)
        done(null, result)
    })
}

let getDelete = (id, done) => {
    db.get().query('DELETE FROM socios WHERE id = ?', [id], (err, result) => {

        if(err) return done(err)
        done(null, result)
    })
}

module.exports = {
    getAll: getAll,
    create: create,
    getDelete: getDelete
}