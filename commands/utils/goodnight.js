const { MessageEmbed, Message } = require('discord.js')

module.exports = {
    name: 'goodnight',
    aliases: 'gn',
    execute(message, args, client) {
        const messages = [
            `Goodnight **${message.author.username}**, have a great sleep!`,
            `Goodnight **${message.author.username}**!`,
            `We wish you have the best dreams ever **${message.author.username}**! Have a great sleep!`
        ]

        var randomMsg = messages[Math.floor(Math.random() * messages.length)]

        const msgEmbed = new MessageEmbed()
        .setDescription(randomMsg)
        .setColor('#FFFF00')

        message.channel.send(msgEmbed)
    }
}