const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');  // Ensure this import is correct
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

// Route definition
router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('name.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('name.lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be a number greater than or equal to 1'),
    body('vehicle.vehicleType').isIn(['bike', 'car', 'van']).withMessage('Invalid vehicle type'),
], captainController.registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], captainController.loginCaptain);

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;
