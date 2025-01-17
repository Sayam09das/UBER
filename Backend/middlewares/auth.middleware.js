const userModel = require('../models/user.Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.Model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    console.log('Received token:', token);  
    
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Unauthorized' });
    }


    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
        console.log('Token is blacklisted');
        return res.status(401).json({ message: 'Token is blacklisted' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded successfully:', decoded);  

        const user = await userModel.findById(decoded._id);
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'User not found' });
        }
        
        req.user = user;
        return next();
    } catch (error) {
        console.log('Error during token verification:', error.message);  
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    console.log('Received token for captain:', token);  
    
    if (!token) {
        console.log('No token provided for captain');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if the token is blacklisted
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
        console.log('Token is blacklisted for captain');
        return res.status(401).json({ message: 'Token is blacklisted' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded successfully for captain:', decoded);  

        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            console.log('Captain not found');
            return res.status(401).json({ message: 'Captain not found' });
        }
        
        req.captain = captain;
        return next();
    } catch (err) {
        console.log('Error during captain token verification:', err.message); 
        return res.status(401).json({ message: 'Unauthorized', error: err.message });
    }
};
