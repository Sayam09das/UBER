const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { getCoordinates } = require('../controllers/maps.controller'); 
const { query } = require('express-validator');
const mapController = require('../controllers/maps.controller');

router.get('/get-coordinates',
  query('address').isString().isLength({ min: 3 }),
  authMiddleware.authUser, mapController.getCoordinates);

module.exports = router;
