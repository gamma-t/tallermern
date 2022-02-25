const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const crypto = require('crypto');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');

// Create schema for User
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name text field is required'],
    },
    email: {
        type: String,
        required: [true, 'The email text field is required'],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please enter a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, 'The password text field is required'],
        minlength: 6
      },
});

// Create model for User
const User = mongoose.model('user', UserSchema);

module.exports = User;