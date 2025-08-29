const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');


router.get('/catways', catwayController.getAllCatways);
router.get('/catways/:number', catwayController.getCatwayByNumber);
router.post('/catways', catwayController.createCatway);
router.put('/catways/:number', catwayController.updateCatwayState);
router.delete('/catways/:number', catwayController.deleteCatway);

module.exports = router;