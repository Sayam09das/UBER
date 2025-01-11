const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'], // Change 10 to 3
        },
        lastname: {
            type: String,
            required: true,
            minlength: [3, 'Last name must be at least 3 characters long'], // Change 10 to 3
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
}, {
    timestamps: true
});


userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to generate auth token
userSchema.methods.generateToken = function () {
    const token = jwt.sign(
        { 
            _id: this._id,
            email: this.email,
            name: this.name 
        }, 
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
};

// Method to compare password
userSchema.methods.comparePassword = async function (password) {
    try {
        const user = await this.constructor.findById(this._id).select('+password');
        return await bcrypt.compare(password, user.password);
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};

// Static method to hash password
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);


module.exports = User;
