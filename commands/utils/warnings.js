const strikeModel = require('../../models/strike')

module.exports = {
    name: 'strikes',
    descriptions: 'View the strikes of a user',
    async execute(message, args, client) {
        const mentionedUser = message.mentions.members.first()
            || message.guild.members.cache.get(args[0])
            || message.member

        const strikeDoc = await strikeModel.findOne({
            guildID: message.guild.id,
            memberID: mentionedUser.id,
        }).catch(err => console.log(err))

        if (!strikeDoc || !strikeDoc.warnings.length) {
            return message.channel.send(`${mentionedUser} doesn't have any warnings!`)
        }

        const data = []

        for (let i = 0; strikeDoc.warnings.length > i; i++) {
            data.push(`**ID:** ${i + 1}`)
            data.push(`**Warn:** ${strikeDoc.warnings[i]}`)
            data.push(`**Moderator:** ${await message.client.users.fetch(strikeDoc.moderator[i]).catch(() => 'Deleted User')}`)
            data.push(`**Date:** ${new Date(strikeDoc.date[i]).toLocaleDateString()}\n`)
        }

        const embed = {
            color: 'YELLOW',
            thumbnail: {
                url: mentionedUser.user.displayAvatarURL({ dynamic: true }),
            },
            description: data.join('\n'),
        }

        message.channel.send({ embed: embed })
    }
}