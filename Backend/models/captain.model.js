const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    name: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'Firstname must be at least 3 characters long'],
            maxlength: 20
        },
        lastname: {
            type: String,
            minlength: [3, 'Lastname must be at least 3 characters long'],
            maxlength: 20
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address'
        ]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketID: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],
            maxlength: 20
        },
        plate: {
            type: String,
            required: true,
            unique: true,
            minlength: [3, 'Plate must be at least 3 characters long'],
            maxlength: 20
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
            max: [10, 'Capacity cannot exceed 10']
        },
        vehicleType: {
            type: String,
            enum: ['bike', 'car', 'van'],
            required: true
        },
        location: {
            lat: {
                type: Number
            },
            lng: {
                type: Number
            }
        }
    }
});

// Corrected: Use `captainSchema.methods` instead of `captainSchema.method`
captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
};

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Corrected: Use `captainSchema.statics` instead of `captainSchema.statics`
captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

// Ensure the model is not defined multiple times
const captainModel = mongoose.models.Captain || mongoose.model('Captain', captainSchema);

module.exports = captainModel;
