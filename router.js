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
/**
 * unterschied von /create-post als get und post
 * hier ruft user /create-post auf und bekommt daher als get die create-post seite -> 
 * wird verarbeitet durch postController.viewCreateScreen
 * userController.mustBeLoggedIn ist eine wiederverwendtbare function die sicherstellt das er user eingeloggt ist.
 */
router.get('/create-post', userController.mustBeLoggedIn, postController.viewCreateScreen)

/**
 * router nimmt post entgegen und schickt die daten nach postController
 * durch aufruf von postController.create function
 */
router.post('/create-post', userController.mustBeLoggedIn, postController.create)
/**
 * variabler post /:id repräsentiert die id des aktuell aufgerufenen blog posts
 * userController.mustBeLoggedIn wird nicht aufgerufen damit posts auch gelesen werden können, wenn user nicht eingeloggt ist.
 */
router.get('/post/:id', postController.viewSingle)

module.exports = router