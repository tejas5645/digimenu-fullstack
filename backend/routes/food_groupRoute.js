const express = require('express');
const router = express.Router();
const food_groupController = require('../controllers/food_groupController');

router.get('/', food_groupController.getFood_group);
router.get('/:fid', food_groupController.getFood_groupById);

module.exports = router;