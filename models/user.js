const Connection = require('../database')
const jwt = require('jsonwebtoken')

const User = {
    login: function (email, password, callbackQuery) {
        return Connection.query('select * from user where email = \'' + email + '\'',
            async function (err, results, fileds) {
                if (!err) {
                    if (results.length > 0) {
                        if (results[0].password == password) {
                            const user = results[0]
                            const token = await jwt.sign({ email: user.email, fullName: user.full_name, id: user.id }, process.env.JWT_KEY)
                            user.token = token
                            updateToken(user, token, callbackQuery)
                        } else {
                            callbackQuery({ status: 400, message: 'Wrong password' })
                        }
                    } else {
                        callbackQuery({ status: 404, message: 'User name not found' })
                    }
                } else {
                    callbackQuery({ status: 500, message: err })
                }
            })
    },
    all: function (callbackQuery) {
        return Connection.query('select * from user', function (err, results, fileds) {
            if (!err) {
                callbackQuery({ status: 200, data: results })
            } {
                callbackQuery({ status: 500, message: err })
            }
        })
    },
    token: function (user_id, token, callbackQuery) {
        return Connection.query('select * from user where token = \'' + token + '\' and id = ' + user_id,
            function (err, results, fileds) {
                if (!err) {
                    if (results.length > 0) {
                        callbackQuery(results[0])
                    } else {
                        callbackQuery()
                    }
                } {
                    callbackQuery({ status: 500, message: err })
                }
            }
        )
    },
};

const updateToken = async function (user, token, callbackQuery) {
    return Connection.query('call UpdateUserToken(' + user.id + ', \'' + token + '\')', function (err, results, fileds) {
        if (!err) {
            callbackQuery({ status: 200, data: user })
        } {
            callbackQuery({ status: 500, message: err })
        }
    })
}

module.exports = User;