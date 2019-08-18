const User = require('../models/User')

exports.login = (req, res) => {
    let user = new User(req.body)
    // Promise nutzen mit then:
    user.login()
    .then(function(result) {
        req.session.user = {
            favColor: "blue",
            username: user.data.username,
        }
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
    if (req.session.user) {
        // struktur ist in der mongo db session
        res.render('home-dashboard', {username: req.session.user.username})
    } else {
        res.render('home-guest')
    }
}