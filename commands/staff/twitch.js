const shopSchema = require('../../models/shop')

module.exports = {
    name: 'twitch',
    async execute(message, args, client) {
        client.user.setActivity("on Twitch @ https://twitch.tv/hopesbounty!", {
            type: 'STREAMING',
            url: 'https://twitch.tv/hopesbounty'
        })

        const shop = await shopSchema.findOne({
            guildID: message.guild.id
        })

        if (!shop) await shopSchema.create({
            guildID: message.guild.id,
            twitchStatus: 'false',
        })

        await shopSchema.findOneAndUpdate({
            guildID: message.guild.id,
        }, {
            twitchStatus: 'true'
        })
        message.channel.send('<:check:827179702996697088> I have added the twitch status!')
    }
}