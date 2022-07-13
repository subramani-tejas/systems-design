const express = require('express')
const database = require('./database')

const app = express()

// keep history of access time for a user
const accesses = {}

app.get('/index.html', (req, res) => {
    const { user } = req.headers

    if (user in accesses) {
        const prevAccessTime = accesses[user]


        // limit to 1 req every 7s
        if (Date.now() - prevAccessTime < 7000) {
            res.status(429).send('Too many requests!\n')
            return
        }
    }

    // show content and store access time
    database.get('index.html', page => {
        accesses[user] = Date.now()
        res.send(page + '\n')
    })

})

// listen on port 3000
app.listen(3000, () => console.log('Listening on port 3000...'))