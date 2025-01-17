const axios = require('axios');

// Geocode an address to get latitude and longitude using Nominatim (OSM)
const getCoordinates = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    try {
        const response = await axios.get(url);
        if (response.data && response.data.length > 0) {
            const location = response.data[0];
            return {
                lat: parseFloat(location.lat),
                lon: parseFloat(location.lon),
            };
        } else {
            return { error: 'Address not found' };
        }
    } catch (error) {
        console.error("Error fetching coordinates for address:", address);
        console.error("Error message:", error.response ? error.response.data : error.message);
        return { error: 'Error fetching coordinates' };
    }
};


const getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        return { error: 'Invalid coordinates for origin or destination' };
    }
    const originCoords = await getCoordinates(origin);
    const destinationCoords = await getCoordinates(destination);

    console.log('Origin Coordinates:', originCoords);
    console.log('Destination Coordinates:', destinationCoords);

    if (originCoords.error || destinationCoords.error) {
        return { error: 'Unable to fetch coordinates for origin or destination' };
    }

    const originLat = originCoords.lat;
    const originLon = originCoords.lon;
    const destinationLat = destinationCoords.lat;
    const destinationLon = destinationCoords.lon;


    const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${originLon},${originLat};${destinationLon},${destinationLat}?overview=false&alternatives=false&steps=false`;

    console.log('OSRM API URL:', osrmUrl);

    try {
        const response = await axios.get(osrmUrl);


        console.log('OSRM API Response:', response.data);

        if (response.data && response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            const distance = route.distance / 1000;
            const duration = route.duration / 60; 
            return {
                distance: `${distance.toFixed(2)} km`,
                duration: `${duration.toFixed(2)} mins`,
            };
        } else {
            return { error: 'Distance and time not found in the response' };
        }
    } catch (error) {
        console.error("Error fetching distance and time from OSRM:");
        console.error("Error message:", error.response ? error.response.data : error.message);
        return { error: 'Error fetching distance and time' };
    }
};

module.exports = { getCoordinates, getDistanceTime };
