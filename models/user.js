const db = require('../database')
const jwt = require('jsonwebtoken');
const e = require('express');

const login = async function (email, password) {
    const [results, fields] = await db.query('select * from user where email = \'' + email + '\'')

    if (results.length > 0) {
        if (results[0].password == password) {
            const user = results[0]
            const token = await jwt.sign({ email: user.email, fullName: user.full_name, id: user.id }, '' + process.env.JWT_KEY)
            user.token = token
            await updateToken(user, token)
            return user
        } else {
            throw new Error('Wrong password')
        }
    } else {
        throw new Error('User name not exist')
    }
}

const getToken = async function (user_id, token) {
    const [users, fields] = await db.query('select * from user where token = \'' + token + '\' and id = ' + user_id)
    if (users.length > 0) {
        return users[0]
    } else {
        throw new Error('Not found')
    }
}

const updateToken = async function (user, token) {
    await db.query('call UpdateUserToken(' + user.id + ', \'' + token + '\')')
}

const getStories = async function (user_id, token) {
    const [rows, fields] = await db.query('select stories.*, user.id as user_id, user.full_name, user.avatar_url, user.is_active, user.created_at as user_created_at, user.updated_at as user_updated_at, user.email, user.token from stories inner join user on stories.user_id = user.id')

    const rs = rows.map(element => {
        var user = {
            id: element.user_id,
            full_name: element.full_name,
            avatar_url: element.avatar_url,
            is_active: element.is_active,
            created_at: element.user_created_at,
            updated_at: element.user_updated_at,
            email: element.email,
            token: element.token
        }
        return {
            id: element.id,
            created_at: element.created_at,
            updated_at: element.updated_at,
            image_url: element.image_url,
            user: user
        }
    })
    return rs
}

const getAllUser = async function () {
    const [users, fields] = await db.query('select * from user')
    return users
}

const getUserById = async function (id) {
    const [users, fields] = await db.query('select * from user where id = ?', [id])
    return users
}

const searchUsers = async function (query) {
    const [users, fields] = await db.query('select * from user where full_name like CONCAT(\'%\', ?, \'%\')', [query])
    return users;
}


const User = {
    login: login,
    all: getAllUser,
    token: getToken,
    stories: getStories,
    search: searchUsers,
    single: getUserById
};

module.exports = User;