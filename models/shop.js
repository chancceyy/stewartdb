const mongoose = require('mongoose')

const shopSchema = mongoose.Schema({
    guildID: {
        type: String,
        required: true,
    },
    twitchStatus: {
        type: String,
    },
    gameShop: {
        type: String,
    },
    gameCooldown: {
        type: String,
    },
    lightShop: {
        type: String,
    },
    lightCooldown: {
        type: String,
    },
    makeupShop: {
        type: String,
    },
    makeupCooldown: {
        type: String,
    },
    notificationShop: {
        type: String,
    },
    notificationCooldown: {
        type: String,
    },
});

module.exports = mongoose.model('shop', shopSchema)
