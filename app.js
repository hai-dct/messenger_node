const express = require('express')
const User = require('./model/user')
const Room = require('./model/room')
const Comment = require('./model/comment')


// khoi dong app
const app = express()

// khoi dong express middleware
app.use(express.json())

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server hoat dong ${port}`))

app.get('/', function (req, res) {
    res.send('Day la router')
})

app.post('/users/login', async function (req, res) {
    const { email, password } = req.body
    User.login(email, password,
        function (resultQuery) {
            res.status(resultQuery.status).json(resultQuery)
        })
})

app.get('/users', function (req, res) {
    User.all(function (resultQuery) {
        res.json(resultQuery)
    })
})

app.get('/rooms', function (req, res) {
    Room.list(5, function (resultQuery) {
        res.json(resultQuery)
    })
})

app.get('/rooms/:id', function (req, res) {
    Room.detail(req.params.id, function (resultQuery) {
        res.json(resultQuery)
    })
})

app.post('/comments/post', function (req, res) {
    const { room_id, comment } = req.body
    Comment.post(room_id, 5, comment, function (resultQuery) {
        res.json(resultQuery)
    })
})