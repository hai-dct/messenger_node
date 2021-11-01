const express = require('express')
const User = require('./models/user')
const Room = require('./models/room')
const Comment = require('./models/comment')
const auth = require('./middleware/auth')
const jwt = require('jsonwebtoken')

// khoi dong app
const app = express()

// khoi dong express middleware
app.use(express.json())

app.use(async function (req, res, next) {
    if (req.headers && req.headers.authorization) {

    } else {
        next()
        return
    }

    const token = req.header('Authorization').replace('Bearer ', '').replace('Bearer ', '')
    try {
        if (!token) throw new Error()
        const data = await jwt.verify(token, '' + process.env.JWT_KEY)
        const user = await User.token(data.id, token)

        req.user = user
        req.token = token
        next()
    } catch {
        req.user = undefined;
        req.token = undefined
        next()
    }
});

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server hoat dong ${port}`))

app.get('/', function (req, res) {
    res.send('Day la router')
})

app.post('/users/login', async function (req, res) {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        res.status(200).json({ status: 200, data: user })
    } catch (err) {
        res.status(400).json({ status: 400, message: err.toString() })
    }
})

app.get('/users', auth, async function (req, res) {
    try {
        const users = await User.all()
        res.status(200).json({ status: 200, data: users })
    } catch (err) {
        res.status(500).json({ status: 500, message: err.toString() })
    }
})

app.get('/users/:id', auth, async function (req, res) {
    try {
        const user = await User.single(req.params.id)
        res.status(200).json({ status: 200, data: user })
    } catch (err) {
        res.status(500).json({ status: 500, message: err.toString() })
    }
})

app.get('/users/search', auth, async function (req, res) {
    const qr = req.query.query
    try {
        const users = await User.search(qr)
        res.status(200).json({ status: 200, data: users })
    } catch (err) {
        res.status(500).json({ status: 500, message: err.toString() })
    }
})

app.get('/users/stories', auth, async function (req, res) {
    try {
        const stories = await User.stories()
        res.status(200).json({ status: 200, data: stories })
    } catch (err) {
        res.status(500).json({ status: 500, message: err.toString() })
    }
})

app.get('/rooms', auth, async function (req, res) {
    try {
        const rooms = await Room.list(req.user.id)
        res.status(200).json({ status: 200, data: rooms })
    } catch (err) {
        res.status(500).json({ status: 500, message: err.toString() })
    }
})

app.get('/rooms/:id', auth, async function (req, res) {
    try {
        const detail = await Room.detail(req.params.id)
        res.status(200).json({ status: 200, data: detail })
    } catch (err) {
        res.status(500).json({ status: 500, message: err.toString() })
    }
})

app.post('/comments/post', auth, async function (req, res) {
    const { room_id, comment, photos } = req.body
    try {
        await Comment.post(room_id, req.user.id, comment, photos)
        res.status(200).json({ status: 200 })
    } catch (err) {
        res.status(500).json({ status: 500, message: err.toString() })
    }
})