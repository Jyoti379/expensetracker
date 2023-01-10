const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');
const userAuthorization =require('../middleware/auth');

router.post('/add-expense',userAuthorization.authenticate,expenseController.addExpenses);
router.get('/get-expenses',userAuthorization.authenticate , expenseController.getExpenses);
router.delete('/delete-expense/:id',userAuthorization.authenticate , expenseController.deleteExpense);



module.exports=router;