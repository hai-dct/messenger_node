const express = require('express')
const database = require('./database')



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
    database.findUserByUserNameAndPW(email, password,
        function (resultQuery) {
            res.status(resultQuery.status).json(resultQuery)
        })
})

app.get('/users', function (req, res) {
    database.getAllUser(function (resultQuery) {
        res.json(resultQuery)
    })
})

app.get('/rooms', function (req, res) {
    database.getRoomByUserId(5, function (resultQuery) {
        res.json(resultQuery)
    })
})

app.get('/rooms/:id', function (req, res) {
    database.getRoomDetailByRoomId(req.params.id, function (resultQuery) {
        res.json(resultQuery)
    })
})

app.post('/comments/post', function (req, res) {
    const { room_id, comment } = req.body
    database.createComment(room_id, 5, comment, function (resultQuery) {
        res.json(resultQuery)
    })
})