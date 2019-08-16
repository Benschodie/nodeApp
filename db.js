const mongodb = require('mongodb')

const connectionString = 'mongodb+srv://fullstackApp:goFullstack01@cluster0-zjzqt.mongodb.net/FullstackNode01?retryWrites=true&w=majority'

mongodb.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    module.exports = client.db()
    // app listen hier damit sichergestellt ist, dass eine verbindung zur datanbank besteht.
    
    // app file wird zugegriffen, siehe dazu export in app file ganz unten. 
    const app = require('./app')
    app.listen(4000)
})