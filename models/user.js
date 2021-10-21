const db = require('../database')
const jwt = require('jsonwebtoken')

const User = {
    login: async function (email, password) {
        const [results, fields] = await db.query('select * from user where email = \'' + email + '\'')

        if (results.length > 0) {
            if (results[0].password == password) {
                const user = results[0]
                const token = await jwt.sign({ email: user.email, fullName: user.full_name, id: user.id }, ${process.env.JWT_SECRET_KEY})
                user.token = token
                await updateToken(user, token)
                return user
            } else {
                throw new Error('Wrong password')
            }
        } else {
            throw new Error('User name not exist')
        }
    },
    all: async function () {
        const [users, fields] = await db.query('select * from user')
        return users
    },
    token: async function (user_id, token) {
        const [users, fields] = await db.query('select * from user where token = \'' + token + '\' and id = ' + user_id)
        if (users.length > 0) {
            return users[0]
        } else {
            throw new Error('Not found')
        }
    },
};

const updateToken = async function (user, token) {
    await db.query('call UpdateUserToken(' + user.id + ', \'' + token + '\')')
}

module.exports = User;