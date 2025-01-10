const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if(isCaptainAlreadyExist){
        return res.status(400).json({ message: 'Captain already exists' });
    }

    const hashedpassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: name.firstname,
        lastname: name.lastname,
        email,
        password: hashedpassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });
    

    const token = captain.generateAuthToken();


    res.status(201).json({ token, captain});
};

module.exports.loginCaptain = async (req, res, next) => {
   const error = validationResult(req);
   if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
   }

   const { email, password } = req.body;

   const captain = await captainModel.findOne({ email }).select('+password');

   if(!captain){
        return res.status(400).json({ message: 'Invalid Credentials' });
   }

   const isMatch = await captain.comparePassword(password);

   if(!isMatch){
        return res.status(400).json({ message: 'Invalid Email or password' });
   }

   const token = captain.generateAuthToken();

   res.cookie('token', token);
    // Set cookie with security flags
    res.cookie('token', token, {
        httpOnly: true,  // Prevent JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production',  // Only set secure cookies in production
        sameSite: 'Strict',  // Can use 'Lax' or 'None' depending on your needs
        maxAge: 1000 * 60 * 60 * 24  // Optional: cookie expiration (1 day in this example)
    });

   res.status(200).json({ token, captain });
};

module.exports.logoutCaptain = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklistTokenModel.create({token});
     
    res.clearCookie('token');

    res.status(200).json({ message: 'Logged out successfully' });
}

exports.getCaptainProfile = async (req, res) => {
    try {
        // Your logic here to get captain profile (e.g., from database or req.user)
        const captain = req.user;  // assuming 'req.user' contains captain info
        res.status(200).json({ message: 'Captain profile fetched successfully', captain });
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};