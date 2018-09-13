const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String        
    },
    postCount: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;