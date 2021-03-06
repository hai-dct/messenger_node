const db = require('../database')

const getList = async function (id) {
    const [rows, fields] = await db.query(`
    select r.*, user.id as user_id, user.full_name, user.email, user.is_active,
    user.avatar_url, user.created_at as user_created_at, user.updated_at as user_updated_at, user.token 
    from (
        select room.* from room 
        inner join group_user_room on room.id = group_user_room.room_id and user_id = ?
    ) r
    inner join group_user_room on r.id = group_user_room.room_id and user_id != ?
    inner join user on group_user_room.user_id = user.id
    order by updated_at desc`, [id, id])

    const rs = rows.map(element => {
        var user = {
            id: element.user_id,
            full_name: element.full_name,
            email: element.email,
            is_active: element.is_active,
            avatar_url: element.avatar_url,
            created_at: element.user_created_at,
            updated_at: element.user_updated_at,
            token: element.token
        }
        return {
            id: element.id,
            created_at: element.created_at,
            updated_at: element.updated_at,
            owner: user,
            last_message: element.last_message
        }
    })
    return rs
}

const getDetail = async function (id) {
    const [rows, fields] = await db.query(`
    select room_detail.id, room_id, room_detail.user_id, user.full_name, user.avatar_url, 
    comment, room_detail.updated_at, room_detail.created_at, comment_photos.image_url
    from room_detail 
    left join user on room_detail.user_id = user.id
    left join comment_photos on room_detail.id = comment_photos.room_detail_id 
    where room_detail.room_id = ${id} ORDER BY id DESC`)


    const arr = []
    // Chunk array
    var index = 0
    rows.forEach(element => {
        if (!arr[index]) {
            arr[index] = [element]
        } else if (arr[index] && arr[index][arr[index].length - 1].id == element.id) {
            arr[index].push(element)
        } else {
            arr[++index] = [element]
        }
    })

    // join array
    var results = arr.map(element => {
        var photos = element.map(e => { return e.image_url }).filter(e => e != null)
        console.log(photos)
        return {
            id: element[0].id,
            room_id: element[0].room_id,
            user_id: element[0].user_id,
            full_name: element[0].full_name,
            avatar_url: element[0].avatar_url,
            comment: element[0].comment,
            updated_at: element[0].updated_at,
            created_at: element[0].created_at,
            photos: photos
        }
    })

    if (results.length > 0) {
        const room = results[0]
        const rs = results.map(element => {
            var user = { id: element.user_id, full_name: element.full_name, avatar_url: element.avatar_url }
            return {
                comment: element.comment,
                user,
                photos: element.photos,
                created_at: element.created_at,
                updated_at: element.updated_at
            }
        })
        return { id: room.id, room_id: room.room_id, comments: rs }
    } else {
        return { id: 0, room_id: Number(id), comments: [] }
    }
}


const Room = {
    list: getList,
    detail: getDetail
};

module.exports = Room;

