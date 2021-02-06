const express = require('express')
const router = express.Router()
const authController = require('../../controllers/authController')

router
    .route('/')
    .post(authController.login)

router
    .route('/')
    .delete(authController.logout)

router
    .route('/')
    .get(authController.checkTokenValidation)

module.exports = router;