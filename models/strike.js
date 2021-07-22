const mongoose = require('mongoose')

const strikes = mongoose.Schema({
    guildID: String,
    memberID: String,
    warnings: Array,
    moderator: Array,
    date: Array,
})

module.exports = mongoose.model('strikes', strikes)