const postsCollection = require('../db').db().collection('posts')

let Post = function(data) {
    this.data = data
    this.errors = []
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
        createDate: new Date()
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

module.exports = Post