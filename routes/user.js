const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const expenseController = require('../controllers/expense');
const userAuthorization =require('../middleware/auth');

router.post('/signup',userController.signup);//check frontend  api call

router.post('/login',userController.login);
router.get('/download',userAuthorization.authenticate,expenseController.downloadexpense)



module.exports = router;