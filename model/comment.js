const Connection = require('../database')

const Comment = {
    post: function (room_id, user_id, comment, callbackQuery) {
        return Connection.query('call createComment(' + room_id + ', ' + user_id + ', \'' + comment + '\')',
            function (err, results, fileds) {
                if (!err) {
                    return Connection.query('call UpdateLastMessage(' + room_id + ', \'' + comment + '\')',
                        function (err, results, fileds) {
                            if (!err) {
                                callbackQuery({ status: 200 })
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
};

module.exports = Comment;