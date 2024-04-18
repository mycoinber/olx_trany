const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    descr: {
        type: String,
    },
    fullName: {
        type: String,
    },
    age: {
        type: Number,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: Boolean,
        default: true
    },
    firstName: {
        type: String,
        required: true,
        unique: true,
    },
    lastName: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['admin', 'sadmin', 'user', 'moderator'],
        default: 'user',
    },
    logo: {
        type: String,
        default: 'path/to/default/logo.png', //Указать путь
    },
    subscription: {
        type: String,
        default: null,
    },
});

// Middleware to update the 'updatedAt' field before saving
userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;