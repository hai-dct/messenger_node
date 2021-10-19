const express = require('express')
const database = require('./database')

// khoi dong app
const app = express()

// khoi dong express middleware
app.use(express.json())

const port = process.env.port || 5000

app.listen(port, () => console.log(`Server hoat dong ${port}`))

app.get('/', function (req, res) {
    res.send('Day la router')
})

app.get('/users', function (req, res) {
    database.getAllUser(function (resultQuery) {
        res.json(resultQuery)
    })
})

app.get('/rooms', function (req, res) {
    database.getRoomByUserId(1, function (resultQuery) {
        res.json(resultQuery)
    })
})

app.get('/rooms/:id', function (req, res) {
    database.getRoomDetailByRoomId(req.params.id, function (resultQuery) {
        res.json(resultQuery)
    })
})