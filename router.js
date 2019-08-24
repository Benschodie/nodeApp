const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')

// user related routes

router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

// post related routes
// user geht auf url create post und will (get) fragt an daher get
router.get('/create-post', userController.mustBeLoggedIn, postController.viewCreateScreen)

// user nimmt post daten entgegen - neuer beitrag soll erstellen werden daher router.post
router.post('/create-post', userController.mustBeLoggedIn, postController.create)

module.exports = router