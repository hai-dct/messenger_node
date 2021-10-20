var mysql = require('mysql')


var connection = mysql.createConnection({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b4a5db242afb3a',
    password: 'ae5332e0',
    database: 'heroku_b21591b79ad0d5b',
    port: 3306
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

exports.findUserByUserNameAndPW = function (email, password, callbackQuery) {
    connection.query('select * from user where email = \'' + email + '\'', function (err, results, fileds) {
        if (!err) {
            if (results.length > 0) {
                if (results[0].password == password) {
                    callbackQuery(results[0])
                } else {
                    callbackQuery({ status: 400, message: 'Wrong password' })
                }
            } else {
                callbackQuery({ status: 404, message: 'User name not found' })
            }
        } {
            console.log(err)
        }
    })
}

exports.getAllUser = function (callbackQuery) {
    // connect()
    connection.query('select * from user', function (err, results, fileds) {
        if (!err) {
            callbackQuery(results)
        } {
            console.log(err)
        }
    })
}

exports.getRoomByUserId = function (id, callbackQuery) {
    // connect()
    connection.query(' select room.id as room_id, room.created_at, room.updated_at, room.last_message, user.id, user.full_name, user.avatar_url from room inner join user on room.owner_id = user.id and user.id = ' + id, function (err, results, fileds) {
        if (!err) {
            const rs = results.map(element => {
                var user = { id: element.id, full_name: element.full_name, avatar_url: element.avatar_url }
                return {
                    id: element.room_id,
                    created_at: element.created_at,
                    updated_at: element.updated_at,
                    owner: user,
                    last_message: element.last_message
                }
            })
            callbackQuery(rs)
        } {
            console.log(err)
        }
    })
}

exports.getRoomDetailByRoomId = function (id, callbackQuery) {
    // connect()
    connection.query('select room_detail.id, room_id, room_detail.user_id, user.full_name, user.avatar_url, comment, room_detail.updated_at, room_detail.created_at from room_detail left join user on room_detail.user_id = user.id where room_detail.room_id = ' + id, function (err, results, fileds) {
        if (!err) {
            const rs = results.map(element => {
                var user = { id: element.user_id, full_name: element.full_name, avatar_url: element.avatar_url }
                return { comment: element.comment, user, created_at: element.created_at, updated_at: element.updated_at }
            })
            callbackQuery({ id: results[0].id, room_id: results[0].room_id, comments: rs })
        } {
            console.error(err)
        }
    })
}

exports.createComment = function (room_id, user_id, comment, callbackQuery) {
    // connect()
    connection.query('call createComment(' + room_id + ', ' + user_id + ', \'' + comment + '\')',
        function (err, results, fileds) {
            if (!err) {

                connection.query('call UpdateLastMessage(' + room_id + ', \'' + comment + '\')',
                    function (err, results, fileds) {
                        if (!err) {
                            callbackQuery()
                        } {
                            console.error(err)
                        }
                    }
                )

            } {
                console.error(err)
            }
        }
    )
}