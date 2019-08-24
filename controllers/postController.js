const Post = require('../models/Post')

exports.viewCreateScreen = function(req, res) {
    // zweiter parameter - object - hier werden daten an das template übergeben 
    res.render('create-post')
}

/**
 * create function erstellt neues Post object und übergibt siehe Post.js
 * @param {req.body} data von title und inhalt
 * @param {req.session.user._id} aus dem session object die aktuelle _id
 */
exports.create = function(req, res) {
    let post = new Post(req.body, req.session.user._id)

    /**
     * @async create() siehe Post.js -> Post.prototype.create
     */
    post.create().then(function() {
        res.send('neuer post erstellt')
    }).catch(function(errors) {
        res.send(errors)
    })
}

/**
 * @async
 */
exports.viewSingle = async function (req, res) {
    try {
        /**
         * post speichert die methode findSingleById aus Post.js 
         * hint: res.render parameter single-post-screen ist das template, post die daten die findSingleById returnt!
         * mega nice 🥰
         */
        let post =  await Post.findSingleById(req.params.id)
        res.render('single-post-screen', {post: post})
    } catch {
        res.send('404')
    }
}