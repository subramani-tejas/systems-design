const express = require('express')
const express_ws = require('express-ws')

const app = express()
express_ws(app)

const messages = [{
    id: '0',
    text: 'TEJAS HERO',
    username: 'NVIA Chat Room'
}]

const sockets = []

app.use(express.json)
app.listen(3000, () => { console.log('Listening on port 3000...') })

app.get('/messages', (req, res) => {
    res.json(messages)
})

app.post('/messages', (req, res) => {
    const message = req.body
    messages.push(message)

    for (const socket of sockets) {
        socket.send(JSON.stringify(message))
    }
})

app.ws('/messages', socket => {
    sockets.push(socket)

    socket.on('close', () => {
        sockets.splice(sockets.indexOf(socket), 1)
    })
})