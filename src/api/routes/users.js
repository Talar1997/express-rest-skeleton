const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const authController = require('../../controllers/authController');
const {authorization, authentication} = require('../middleware/authMiddleware')
const {roles} = require('../../config/constants/roles')

//--Route security
router.use(authentication.protect);
router.use(authorization.restrictTo(roles.ADMIN));

//Only for admin
router
    .route('/')
    .get(userController.getAllUsers);

router
    .route('/:id')
    .get(userController.getUser);

router
    .route('/:id')
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

router
    .route('/')
    .post(authController.signUp);

module.exports = router;