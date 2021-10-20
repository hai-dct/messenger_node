const Connection = require('../database')

const Room = {
    list: function (id, callbackQuery) {
        return Connection.query(' select room.id as room_id, room.created_at, room.updated_at, room.last_message, user.id, user.full_name, user.avatar_url from room inner join user on room.owner_id = user.id and user.id = ' + id, function (err, results, fileds) {
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
                callbackQuery({ status: 200, data: rs })
            } {
                console.log(err)
            }
        })
    },
    detail: function (id, callbackQuery) {
        // connect()
        return Connection.query('select room_detail.id, room_id, room_detail.user_id, user.full_name, user.avatar_url, comment, room_detail.updated_at, room_detail.created_at from room_detail left join user on room_detail.user_id = user.id where room_detail.room_id = ' + id, function (err, results, fileds) {
            if (!err) {
                if (results.length > 0) {
                    const rs = results.map(element => {
                        var user = { id: element.user_id, full_name: element.full_name, avatar_url: element.avatar_url }
                        return { comment: element.comment, user, created_at: element.created_at, updated_at: element.updated_at }
                    })
                    callbackQuery({ status: 200, data: { id: results[0].id, room_id: results[0].room_id, comments: rs } })
                } else {
                    callbackQuery({ status: 404 })
                }
            } {
                console.error(err)
            }
        })
    }
};

module.exports = Room;
