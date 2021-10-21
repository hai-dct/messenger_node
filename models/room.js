const db = require('../database')

const Room = {
    list: async function (id) {
        const [rows, fields] = await db.query(' select room.id as room_id, room.created_at, room.updated_at, room.last_message, user.id, user.full_name, user.avatar_url from room inner join user on room.owner_id = user.id and user.id = ' + id)
        const rs = rows.map(element => {
            var user = { id: element.id, full_name: element.full_name, avatar_url: element.avatar_url }
            return {
                id: element.room_id,
                created_at: element.created_at,
                updated_at: element.updated_at,
                owner: user,
                last_message: element.last_message
            }
        })
        return rs
    },
    detail: async function (id) {
        const [rows, fields] = await db.query('select room_detail.id, room_id, room_detail.user_id, user.full_name, user.avatar_url, comment, room_detail.updated_at, room_detail.created_at from room_detail left join user on room_detail.user_id = user.id where room_detail.room_id = ' + id)

        if (rows.length > 0) {
            const room = rows[0]
            const rs = rows.map(element => {
                var user = { id: element.user_id, full_name: element.full_name, avatar_url: element.avatar_url }
                return { comment: element.comment, user, created_at: element.created_at, updated_at: element.updated_at }
            })
            return { id: room.id, room_id: room.room_id, comments: rs }
        } else {
            throw Error('Not found')
        }
    }
};

module.exports = Room;
