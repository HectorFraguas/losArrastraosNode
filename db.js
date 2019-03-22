const mysql = require('mysql')

let pool = null

let connect = (done) => {
    // pool = mysql.createPool({
    //     host: '127.0.0.1',
    //     user: 'root',
    //     password: '',
    //     port: 3306,
    //     database: 'los_arrastraos'
    // })
    pool = mysql.createPool({
        host: 'localhost',
        user: 'losarras_web',
        password: 'Leoncete46',
        port: 3306,
        database: 'losarras_production'
    })
    done()
}

let get = () => {
    return pool
}

module.exports = {
    connect: connect,
    get: get
}