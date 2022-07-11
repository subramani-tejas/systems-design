const helper = require('./helper')
const messagingAPI = require('./messaging-api')
const readline = require('readline')

const displayedMessages = {}

const terminal = readline.createInterface({
    input: process.stdin
})

terminal.on('line', text => {
    const username = process.env.NAME
    const id = helper.getRandom(1000)
    displayedMessages[id] = true

    const message = { id, text, username }
    messagingAPI.sendMessage(message)
})

function displayMessage(message) {
    console.log(`> ${message.username}: ${message.text}`)
    displayedMessages[message.id] = true
}

async function getAndDisplayMessages() {
    const messages = await messagingAPI.getMessages()

    for (const message of messages) {
        const messageDisplayed = message.id in displayedMessages
        if (!messageDisplayed) displayMessage(message)
    }
}

function pollMessages() {
    setInterval(getAndDisplayMessages, 3000)
}

function streamMessages() {
    const messageSocket = messagingAPI.createMessagingSocket()

    messageSocket.on('message', data => {
        const message = JSON.parse(data)

        const messageDisplayed = message.id in displayedMessages
        if (!messageDisplayed) displayMessage(message)
    })
}

if (process.env.MODE == 'poll') {
    getAndDisplayMessages()
    pollMessages()
} else if (process.env.MODE == 'stream') {
    getAndDisplayMessages()
    streamMessages()
}