const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    try {
        const data = await jwt.verify(token, process.env.JWT_KEY)
        User.token(data.id, token, function (user) {
            if (user != null) {
                req.user = user
                req.token = token
                next()
            } else {
                res.status(401).send({ error: 'Not authorized to access this resource' })
            }
        })
    } catch (err) {
        res.status(401).send({ error: err })
    }
}
module.exports = auth