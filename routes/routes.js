const express = require('express');
const router = express.Router();
const userController = require('../api/controllers/AuthController');
router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.get('/users', userController.view);
module.exports = router;