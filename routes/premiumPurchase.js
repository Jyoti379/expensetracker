const express = require('express');
const router = express.Router();
const premiumController = require('../controllers/premiumPurchase');
const userAuthorization =require('../middleware/auth');

router.get('/showLeaderboard',userAuthorization.authenticate,premiumController.getUserLeaderboard);
//router.post('/updateTransactionStatus',userAuthorization.authenticate,premiumController.updateTransaction)

module.exports = router;