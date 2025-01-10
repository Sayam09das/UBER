const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cookiesParser = require('cookie-parser');
const cors = require('cors');
const connectTODb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
connectTODb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
        return res.status(400).send({ error: 'Invalid JSON format' });
    }
    next();
});

module.exports = app;
