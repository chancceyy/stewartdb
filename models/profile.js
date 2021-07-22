const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },profileName: {
        type: String,
        required: true,
    },profileBal: {
        type: Number,
        required: true
    },profileBank: {
        type: Number,
        require: true
    },
});

module.exports = mongoose.model('profile-settings', profileSchema)
