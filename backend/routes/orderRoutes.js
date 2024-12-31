const express = require('express');
const { handleOrder } = require('../controllers/orderController');

const router = express.Router();

router.post('/', handleOrder);

module.exports = router;
