const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/User')

router.post('/signup/register', userControllers.signup)
router.get('/signup/confirm', userControllers.signupConfirm)

router.post('/login', userControllers.login)

module.exports = router
