const { MessageEmbed } = require('discord.js')
const strike = require('../../models/strike')
const strikeModel = require('../../models/strike')

module.exports = {
    name: 'unstrike',
    description: 'Remove a strike from a user.',
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

        const reason = args.slice(3).join(' ') || 'No reason was given.'

        let strikeDoc = await strikeModel.findOne({
            guildID: message.guild.id,
            memberID: mentionedUser.id
        }).catch(err => console.log(err))

        if (!strikeDoc) {
            return message.channel.send('This member doesn\'t have any warnings therefore you can\'t remove any!')
        }

        const warningID = parseInt(args[2])

        if (warningID <= 0 || warningID > strikeDoc.warnings.length) {
            return message.channel.send('Invalid warning ID')
        }

        strikeDoc.warnings.splice(warningID - 1, warningID !== 1 ? warningID - 1 : 1)

        await strikeDoc.save()

        const removedStrike1 = new MessageEmbed()
        .setAuthor(`Success! I have fully removed the strike!`)
        .setDescription(`I have removed the strike with the ID ${warningID} for ${mentionedUser}!`)
        .setColor('GREEN')
        message.channel.send(removedStrike1)

        const removedStrike2 = new MessageEmbed()
        .setAuthor(`Success! The removed strike has been logged!`)
        .setDescription(`
**Strike ID ${warningID} from ${mentionedUser.user.username}**

Staff who removed the strike: **${message.author.username}**
Reason of the removed strike: **${reason}**
        `)
        .setColor('GREEN')

        return client.channels.cache.get('800137831858176031').send(removedStrike2)            
    }   
}