const express = require('express')
const User = require('./models/user')
const Room = require('./models/room')
const Comment = require('./models/comment')
const auth = require('./middleware/auth')

// khoi dong app
const app = express()

// khoi dong express middleware
app.use(express.json())

// app.use(function (req, res, next) {
//     if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
//         jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
//             if (err) req.user = undefined;
//             req.user = decode;
//             next();
//         });
//     } else {
//         req.user = undefined;
//         next();
//     }
// });

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server hoat dong ${port}`))

app.get('/', function (req, res) {
    res.send('Day la router')
})

app.post('/users/login', async function (req, res) {
    const { email, password } = req.body
    User.login(email, password,
        function (resultQuery) {
            console.log(resultQuery)
            res.status(resultQuery.status).json(resultQuery)
        })
})

app.get('/users', auth, function (req, res) {
    User.all(function (resultQuery) {
        res.json(resultQuery)
    })
})

app.get('/rooms', auth, function (req, res) {
    Room.list(req.user.id, function (resultQuery) {
        res.json(resultQuery)
    })
})

app.get('/rooms/:id', auth, function (req, res) {
    Room.detail(req.params.id, function (resultQuery) {
        res.json(resultQuery)
    })
})

app.post('/comments/post', auth, function (req, res) {
    const { room_id, comment } = req.body
    Comment.post(room_id, 5, comment, function (resultQuery) {
        res.json(resultQuery)
    })
})