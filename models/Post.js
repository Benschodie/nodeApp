const postsCollection = require('../db').db().collection('posts')
// inkludiert eine mongodb methode die mit ids arbeitet
const ObjectID = require('mongodb').ObjectID


/**
 * 
 * @param {req.body} data von post erstellen
 * @param {req.session.user._id} userid aus dem session object
 */
let Post = function(data, userid) {
    this.data = data
    this.errors = []
    this.userid = userid
}

Post.prototype.cleanup = function() {
    const {title, body} = this.data
    if (typeof(title) != "string") {title = ""}
    if (typeof(body) != "string") {body = ""}
    // get rid of any bogus properties
    // Was möchte ich habe? hier wird das object erstellt, rest wird ignoriert
    this.data = {
        title: title.trim(),
        body: body.trim(),
        createDate: new Date(),
        author: ObjectID(this.userid),
    }
}

Post.prototype.validate = function () {
    if (this.data.title == "") {this.errors.push('du brauchst einen titel')}
    if (this.data.body == "") { this.errors.push('du brauchst inhalt') }
}

Post.prototype.create = function () {
    return new Promise((resolve, reject) => {
        this.cleanup()
        this.validate()
        if (!this.errors.length) {
            // save post into database
            postsCollection.insertOne(this.data).then(() => {
                resolve()
            }).catch(() => {
                this.errors.push('bitte versuche es später nochmal')
                reject(this.errors)
            })
        } else {
            reject(this.errors)
        }
    })
}

Post.findSingleById = function(id) {
    return new Promise(async function(resolve, reject) {
        if (typeof(id) != "string" || !ObjectID.isValid(id)) {
            reject()
            return
        }
        /**
         * die function in post wartet durch await so lange bis sie fertig ist
         * heißt erst danach geht es mit dem if statement weiter.
         */
        let post = await postsCollection.findOne({_id: new ObjectID(id)})
        if (post) {
            resolve(post)
        } else {
            reject()
        }
    })
}

module.exports = Post