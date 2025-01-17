const axios = require('axios');

const apiKey = 'a4c6bd531c045643d658d2fcd7bc5846';

const getCoordinates = async (address) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${encodeURIComponent(address)}`;

    try {
        const response = await axios.get(url);
        if (response.data && response.data.data.length > 0) {
            const location = response.data.data[0];
            return {
                lat: location.latitude,
                lon: location.longitude,
            };
        } else {
            return { error: 'Address not found' };
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error.response ? error.response.data : error.message);
        throw new Error('Error fetching coordinates');
    }
};

module.exports = { getCoordinates };
