const mongoose = require('mongoose');
function connectTODb() {
    mongoose.connect(process.env.DB_CONNECT,)
    .then(() => {
        console.log('Connected to DB!');
    })
    .catch(err => {
        console.error('Error connecting to DB:', err.message);
    });
}

module.exports = connectTODb;
