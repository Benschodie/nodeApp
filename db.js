const dotenv = require('dotenv')
dotenv.config()
const mongodb = require('mongodb')

mongodb.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    module.exports = client
    // app listen hier damit sichergestellt ist, dass eine verbindung zur datanbank besteht.
    
    // app file wird zugegriffen, siehe dazu export in app file ganz unten. 
    const app = require('./app')
    app.listen(process.env.PORT)
})