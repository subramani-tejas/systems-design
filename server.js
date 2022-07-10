const express = require('express')
const app = express()

app.use(express.json())
app.listen(3000, () => console.log('Listening on port 3000...'))

app.get('/hello-world', (req, res) => {
    console.log('Headers: ', req.headers)
    console.log('Method: ', req.method)

    var response = {
        'title': 'TEJAS HERO',
        'message': 'Received GET request!'
    }
    
    res.send(response)
})