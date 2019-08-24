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

/**
 * router nimmt post entgegen und schickt die daten nach postController
 * durch aufruf von postController.create function
 */
router.post('/create-post', userController.mustBeLoggedIn, postController.create)

module.exports = router