const { MessageEmbed } = require('discord.js')
const strike = require('../../models/strike')
const strikeModel = require('../../models/strike')

module.exports = {
    name: 'strike',
    description: 'Strike a user in the server!',
    async execute(message, args, client) {

        const mentionedUser = message.mentions.members.first()
            || message.guild.members.cache.get(args[1])

        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.channel.send('Sorry, no!')
        }

        if (!mentionedUser) {
            return message.channel.send('Mention a user to strike plls')
        }

        const mentionedPosition = mentionedUser.roles.highest.position
        const memberPosition = message.member.roles.highest.position

        if (memberPosition <= mentionedPosition) {
            return message.channel.send('Nice try!')
        }

        const reason = args.slice(2).join(' ') || 'No reason was given.'

        let strikeDoc = await strikeModel.findOne({
            guildID: message.guild.id,
            memberID: mentionedUser.id
        }).catch(err => console.log(err))

        if (!strikeDoc) {
            strikeDoc = new strikeModel({
            guildID: message.guild.id,
            memberID: mentionedUser.id,
            warnings: [reason],
            moderator: [message.member.id],
            date: [Date.now()]
        })

        await strikeDoc.save().catch(err => console.log(err))
    }
        else {  
            if (strikeDoc.length >= 3) {
                return message.channel.send('This user already has 3 warnings, what else do you want me to do eh?')
            }

            strikeDoc.warnings.push(reason)
            strikeDoc.moderator.push(message.member.id)
            strikeDoc.date.push(Date.now())

            await strikeDoc.save().catch(err => console.log(err))
        }
           message.channel.send(`Warned ${mentionedUser} for the reason **${reason}`)     
           const striked = new MessageEmbed()
            .setAuthor(`I have striked ${mentionedUser}!`)
            .setDescription(`
**Success**
Reason: ${reason}
Moderator: ${message.author.username}
            `)
            client.channels.cache.get('800137831858176031').send(striked)            
    }
}