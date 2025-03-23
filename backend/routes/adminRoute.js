const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.admin);
router.post('/login', adminController.login);
router.get('/check-session', adminController.checkSession);

router.post('/menu', adminController.postMenu);
router.put('/menu/:mid', adminController.putMenu);
router.put('/menu/price:mid', adminController.putMenuPrice);
router.delete('/menu/:mid', adminController.deleteMenu);

router.post('/food_group', adminController.postFoodgroup);
router.put('/food_group/:fid', adminController.putFoodgroup);
router.delete('/food_group/:fid', adminController.deleteFoodgroup);

router.post('/quantity', adminController.postQuantity);
router.put('/quantity/:qid', adminController.putQuantity);
router.delete('/quantity/:qid', adminController.deleteQuantity);

router.post('/logout', adminController.logout);

module.exports = router;