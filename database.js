const mysql = require('mysql2/promise')

// const connect = function () {
//     Connection.connect(function (err) {
//         if (!err) {
//             console.log('Database is connected')
//         } else {
//             console.log('Database connect error:', err)
//         }
//     })
// }

// const closeDB = function () {
//     Connection.end(function (err) {
//         if (!err) {
//             console.log('Closed db')
//         }
//     })
// }

const dbConfig = {
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b4a5db242afb3a',
    password: 'ae5332e0',
    database: 'heroku_b21591b79ad0d5b',
    port: 3306
}

const db = {
    query: async function (sql, params) {
        const cons = await mysql.createConnection(dbConfig)
        return cons.execute(sql, params)
    },
}

module.exports = db;