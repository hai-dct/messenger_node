const db = require('../database')

const Comment = {
    post: async function (room_id, user_id, comment, photos) {
        const [rows, fields] = await db.query('call createComment(' + room_id + ', ' + user_id + ', \'' + comment + '\')')

        if (photos && photos.length > 0) {
            const room_detail_id = rows[0][0].insert_id
            const convertValues = photos.map(element => '(' + room_detail_id + ', \'' + element + '\')')
            const values = convertValues.join(', ')
            await db.query('insert into comment_photos(room_detail_id, image_url) values ' + values)
            await db.query('call UpdateLastMessage(' + room_id + ', \'You have send a photo\')')
        } else {
            await db.query('call UpdateLastMessage(' + room_id + ', \'' + comment + '\')')
        }
    }
};

module.exports = Comment;
