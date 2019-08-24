const Post = require('../models/Post')

exports.viewCreateScreen = function(req, res) {
    // zweiter parameter - object - hier werden daten an das template übergeben 
    res.render('create-post')
}

exports.create = function(req, res) {
    let post = new Post(req.body)

    post.create().then(function() {
        res.send('neuer post erstellt')
    }).catch(function(errors) {
        res.send(errors)
    })
}