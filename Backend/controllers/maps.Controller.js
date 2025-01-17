const mapsService = require('../services/map.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const address = req.query.address;

    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        if (!mapsService.getCoordinates) {
            return res.status(500).json({ error: 'getCoordinates function not found in mapsService' });
        }

        const coordinates = await mapsService.getCoordinates(address);
        
        if (coordinates.error) {
            return res.status(404).json({ error: 'Coordinates not found', details: coordinates.error });
        }
        
        res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        res.status(500).json({ error: 'Error fetching coordinates', details: error.message });
    }
};
