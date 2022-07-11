const database = {
    ['index.html']: '<html><h2>TEJAS HERO</h2></html>'
}

module.exports.get = (key, callback) => {
    setTimeout(() => {
        callback(database[key])
    }, 3000)
}