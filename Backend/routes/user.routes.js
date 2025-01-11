const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');


// Route for user registration
router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('name.firstname').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.register);

// Route for user login
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.loginUser);

// Routes for profile
router.get('/profile',authMiddleware.authUser, userController.getUserProfile);

router.get('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;