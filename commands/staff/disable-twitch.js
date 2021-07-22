const shopSchema = require('../../models/shop')

module.exports = {
    name: 'disable-twitch',
    async execute(message, args, client) {
        client.user.setActivity()
        
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
            twitchStatus: 'false'
        })
        message.channel.send('<:check:827179702996697088> I have removed the twitch status!')
    }
}