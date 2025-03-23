
const express = require('express');
const router = express.Router();
const qauntityController = require('../controllers/quantityController');

router.get('/', qauntityController.getQuantity);
router.get('/:qid', qauntityController.getQuantityById);

module.exports = router;
