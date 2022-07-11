const axios = require('axios')
const socket = require('ws')

function createMessagingSocket() {
    return new socket('ws://localhost:3000/messages')
}

function getMessages() {
    return axios.get('http://localhost:3000/messages').then((res) => res.data)
}

function sendMessage(message) {
    return axios.post('http://localhost:3000/messages', message)
}

module.exports.createMessagingSocket = createMessagingSocket
module.exports.getMessages = getMessages
module.exports.sendMessage = sendMessage