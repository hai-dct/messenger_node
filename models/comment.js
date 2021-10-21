const db = require('../database')

const Comment = {
    post: async function (room_id, user_id, comment) {
        await db.query('call createComment(' + room_id + ', ' + user_id + ', \'' + comment + '\')')
        await db.query('call UpdateLastMessage(' + room_id + ', \'' + comment + '\')')
    }
};

module.exports = Comment;
