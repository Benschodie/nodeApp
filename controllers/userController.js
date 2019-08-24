const User = require('../models/User')

exports.mustBeLoggedIn = function(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        req.flash('errors', 'Du musst eingeloggt, sein um das machen zu können')
        req.session.save(function() {
            res.redirect('/')
        })
    }
}

exports.login = (req, res) => {
    let user = new User(req.body)
    // Promise nutzen mit then:
    user.login()
    .then(function(result) {
        req.session.user = { avatar: user.avatar, username: user.data.username, _id: user.data._id }
        req.session.save(function () {
            res.redirect('/')
        })
    })
    .catch(function (err) {
        req.flash('errors', err)
        // check session object
        req.session.save(function () {
            res.redirect('/')
        })
    })
}

exports.logout = (req, res) => {
    // wird mit session abgeglichen, wenn session da wird sie zerstört 
    // promise zum erstellungszeitpunkt der app nicht unterstützt, daher callback
    req.session.destroy(function() {
        // Callback weil destroy function muss durchgelaufen sein vor redirect
        res.redirect('/')
    })
    
}

exports.register = (req, res) => {
    let user = new User(req.body)
    user.register().then(() => {
        req.session.user = {username: user.data.username, avatar: user.avatar, _id: user.data._id}
        req.session.save(function () {
            res.redirect('/')
        })

    }).catch((regErrors) => {
        regErrors.forEach(function (error) {
            req.flash('regErrors', error)
        })
        req.session.save(function () {
            res.redirect('/')
        })
    })
    
}

exports.home = (req, res) => {
    if (req.session.user) {
        // struktur ist in der mongo db session
        res.render('home-dashboard')
    } else {
        res.render('home-guest', {errors: req.flash('errors'), regErrors: req.flash('regErrors')})
    }
}