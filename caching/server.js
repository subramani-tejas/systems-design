const express = require('express')
const database = require('./database')

const app = express()
const cache = {}

// no caching
app.get('/nocache/index.html', (req, res) => {
    database.get('index.html', (page) => {
        res.send(page)
    })
})

// cached
app.get('/cache/index.html', (req, res) => {
    
    // cache hit
    if ('index.html' in cache) {
        res.send(cache['index.html'])
        console.log("Data from cache")
        return
    }

    // cache miss
    database.get('index.html', (page) => {
        cache['index.html'] = page
        res.send(page)
    })
})


// listen on port 3000
app.listen(3000, () => console.log('Listening on port 3000...'))