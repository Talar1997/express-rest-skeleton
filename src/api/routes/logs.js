const express = require('express');
const router = express.Router();
const logController = require('../../controllers/logController')
const {authorization, authentication} = require('../middleware/authMiddleware')
const {roles} = require('../../config/constants/roles')

//--Route security
router.use(authentication.protect);
router.use(authorization.restrictTo(roles.USER, roles.ADMIN));
//-- End of route security

router
    .route('/')
    .get(logController.getAllLogs);

router
    .route('/:id')
    .get(logController.getOneLog);

module.exports = router;
