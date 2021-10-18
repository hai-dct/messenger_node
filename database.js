var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'messenger',
    port: 8889
})

var connect = function () {
    connection.connect(function (err) {
        if (!err) {
            console.log('Database is connected')
        } else {
            console.log('Database connect error:', err)
        }
    })
}

var closeDB = function () {
    connection.end(function (err) {
        if (!err) {
            console.log('Closed db')
        }
    })
}

exports.getAllUser = function (callbackQuery) {
    connect()
    connection.query('select * from user', function (err, results, fileds) {
        if (!err) {
            callbackQuery(results)
        } {
            console.log(err)
        }
    })
}

exports.getRoomByUserId = function (id, callbackQuery) {
    connect()
    connection.query('select * from room inner join user on room.owner_id = user.id and user.id = ' + id, function (err, results, fileds) {
        if (!err) {
            const rs = results.map(element => {
                var user = { id: element.id, full_name: element.full_name }
                return { id: element.id, created_at: element.created_at, updated_at: element.updated_at, owner: user }
            })
            callbackQuery(rs)
        } {
            console.log(err)
        }
    })
}

exports.getRoomDetailByRoomId = function (id, callbackQuery) {
    connect()
    connection.query('select room_detail.id, room_id, room_detail.user_id, user.full_name, comment from room_detail left join user on room_detail.user_id = user.id where room_detail.room_id = ' + id, function (err, results, fileds) {
        if (!err) {
            const rs = results.map(element => {
                var user = { id: element.user_id, full_name: element.full_name }
                return { comment: element.comment, user }
            })
            callbackQuery({ id: results[0].id, room_id: results[0].room_id, comments: rs })
        } {
            console.error(err)
        }
    })
}
// [{"id":3,"room_id":2, "user": {"full_name":"anh.nguyen"},"comment":"Good morning!"}]