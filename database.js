const mysql = require('mysql')

const Connection = mysql.createConnection({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b4a5db242afb3a',
    password: 'ae5332e0',
    database: 'heroku_b21591b79ad0d5b',
    port: 3306
})

const connect = function () {
    Connection.connect(function (err) {
        if (!err) {
            console.log('Database is connected')
        } else {
            console.log('Database connect error:', err)
        }
    })
}

const closeDB = function () {
    Connection.end(function (err) {
        if (!err) {
            console.log('Closed db')
        }
    })
}

module.exports=Connection;