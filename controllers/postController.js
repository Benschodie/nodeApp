exports.viewCreateScreen = function(req, res) {
    // zweiter parameter - object - hier werden daten an das template übergeben 
    res.render('create-post', { username: req.session.user.username, avatar: req.session.user.avatar})
}