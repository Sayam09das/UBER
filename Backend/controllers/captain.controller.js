const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

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