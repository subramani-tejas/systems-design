const express = require('express')
const fs = require('fs')

const DATA_DIR = __dirname

const app = express()
app.use(express.json())


const hashtable = {}

// add the req data to in memory storage
app.post('/memory/:key', (req, res) => {    
    hashtable[req.params.key] = req.body.data    
    res.send()
    console.log("WRITE OK (in-memory storage)")
})

// get the requested data from in memory storage
app.get('/memory/:key', (req, res) => {
    const key = req.params.key

    if (key in hashtable) {
        res.send(hashtable[key])
        console.log("READ OK (in-memory storage)")
        return
    }
    res.send('Not found!')
})

// add the req data to disk
app.post('/disk/:key', (req, res) => {
    const destinationFile = `${DATA_DIR}/${req.params.key}`    
    fs.writeFileSync(destinationFile, req.body.data)
    res.send()
    console.log("WRITE OK. (disk)")    
})

// get the requested data from disk
app.get('/disk/:key', (req, res) => {
    const destinationFile = `${DATA_DIR}/${req.params.key}`

    try {
        const data = fs.readFileSync(destinationFile)
        res.send(data)
        console.log("READ OK. (disk)")
    } catch (e) {
        res.send('Not found!')
    }
})

// listen on port 3000
app.listen(3000, () => console.log('Listening on port 3000...'))