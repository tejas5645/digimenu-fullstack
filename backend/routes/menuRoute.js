const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/', menuController.getMenu);
router.get('/:mid', menuController.getMenuById);
router.get('/name/:nm', menuController.getMenuByName);


module.exports = router;
