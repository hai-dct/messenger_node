const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    if (!req.user) res.status(401).send({ status: 401, error: 'Not authorized to access this resource' })
    next()
}

module.exports = auth