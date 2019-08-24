const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')

// user related routes

router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

/**
 * unterschied von /create-post als get und post
 * hier ruft user /create-post auf und bekommt daher als get die create-post seite -> 
 * wird verarbeitet durch postController.viewCreateScreen
 */
router.get('/create-post', userController.mustBeLoggedIn, postController.viewCreateScreen)

/**
 * router nimmt post entgegen und schickt die daten nach postController
 * durch aufruf von postController.create function
 */
router.post('/create-post', userController.mustBeLoggedIn, postController.create)

module.exports = router