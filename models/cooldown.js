const mongoose = require('mongoose')

const cooldownSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    begCooldown: {
        type: String,
    },
    jobCooldown: {
        type: String,
    },dailyCooldown: {
        type: String,
    },weeklyCooldown: {
        type: String,
    },robCooldown: {
        type: String,
    },flipCooldown: {
        type: String,
    },rpsCooldown: {
        type: String,
    }
});

module.exports = mongoose.model('cooldowns', cooldownSchema)
