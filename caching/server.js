const express = require('express')
const redis = require('redis').createClient()
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

// cache using redis
app.get('/redis/index.html', (req, res) => {

    try {
        redis.get('index.html', (error, redisResponse) => {
            if (redisResponse) {
                res.send(redisResponse)
                return
            }

            database.get('index.html', page => {
                redis.set('index.html', page, 'EX', 10)
                res.send(page)
            })
        })
    } catch (e) {
        console.log('Error')
    }
})

// listen on port 3000
app.listen(3000, () => console.log('Listening on port 3000...'))