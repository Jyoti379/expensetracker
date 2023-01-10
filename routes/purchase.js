const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchase');
const userAuthorization =require('../middleware/auth');

router.get('/purchaseMembership',userAuthorization.authenticate ,purchaseController.purchasepremium );
router.post('/updateTransactionStatus',userAuthorization.authenticate,purchaseController.updateTransaction)

module.exports = router;