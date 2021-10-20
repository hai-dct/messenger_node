const Connection = require('../database')

const User = {
    login: function (email, password, callbackQuery) {
        return Connection.query('select * from user where email = \'' + email + '\'', function (err, results, fileds) {
            if (!err) {
                if (results.length > 0) {
                    if (results[0].password == password) {
                        callbackQuery({ status: 200, data: results[0] })
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
    },
    all: function (callbackQuery) {
        return Connection.query('select * from user', function (err, results, fileds) {
            if (!err) {
                callbackQuery({ status: 200, data: results })
            } {
                console.log(err)
            }
        })
    }
};

module.exports = User;
