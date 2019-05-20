const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('fast-csv');
const upload = multer({ dest: 'tmp/csv/' });

const userController = require('../api/controllers/AuthController');
router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.post('/CSVsearch',upload.single('file'), userController.CSVsearch);
router.get('/users', userController.view);
module.exports = router;