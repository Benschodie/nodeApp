const User = require('../models/User')

exports.login = (req, res) => {
    let user = new User(req.body)
    // Promise nutzen mit then:
    user.login()
    .then(function(result) {
        res.send(result)
    })
    .catch(function(err) {
        res.send(err)
    })
}

exports.logout = () => {

}

exports.register = (req, res) => {
    let user = new User(req.body)
    user.register()
    if (user.errors.length) {
        res.send(user.errors)
    } else {
        res.send('thx')
    }
}

exports.home = (req, res) => {
    res.render('home-guest')
}