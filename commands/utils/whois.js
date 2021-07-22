const strikeModel = require('../../models/strike')
const moment = require('moment')
const { MessageEmbed } = require('discord.js')
const mongoose = require('mongoose')
const strike = require('../../models/strike')

module.exports = {
    name: 'whois',
    description: 'Shows members discord information',
    async execute(message, args, client) {

        const member = message.mentions.members.first()
        || message.member

        const strikeDoc = await strikeModel.findOne({
            guildID: message.guild.id,
            memberID: member.id,
        })

        const username = member.user.username
        const createdDiscord = moment(member.user.createdAt)
        const createdFormat = createdDiscord.format("DD/MM/YY LTS")
        const joinedDate = moment.utc(member.joinedAt).format('DD/MM/YY LTS')

        if (!strikeDoc) {
            const strikeNumber = '0'
        }
        else if (strikeDock) {
            strikeNumber = strikeDoc.warnings.length
        }

        message.channel.send(createdFormat)

        const whois = new MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
        .addFields(
            { name: 'Joined At', value: joinedDate, inline: true },
            { name: 'Registered At', value: createdFormat, inline: true },
            { name: 'Strikes', value: strikeNumber, inline: true },
        )    

        message.channel.send(whois)
    }
}