const db = require('mongoose')
const profieSchema = require('../../models/profile');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'deposit',
    description: 'Deposit money into the bank',
    aliases: ['dep'],
    async execute(message, args, client) {
    
        const profie = await profieSchema.findOne({
            userID: message.author.id
        })

        const noProfileError = new MessageEmbed()
            .setAuthor(`An error has occured!`)
            .setDescription(`You do not have an account for the economy system!`)
            .setColor('RED')

        if (!profie) return message.channel.send(noProfileError)
        if (!args[1]) return message.channel.send('You need to specify a number to add or do !deposit all!')

        const bal = profie.profileBal
        const bank = profie.profileBank

        if (bal < args[1]) return message.channel.send('You don\'t have enough money to deposit!')

        if (args[1] === 'all') {
            await profieSchema.findOneAndUpdate({
                userID: message.member.id
            },
            {
                userID: message.member.id,
                profileBal: (bal) - (bal),
                $inc: {
                    profileBank: bal
                }
            })
            return message.channel.send(`I have deposited all of your coins ($${bal})`)
        }

        if (isNaN(args[1]) || args[1] < 0) return message.channel.send('You need to specify an amount of money to deposit that is above 0!')

        await profieSchema.findOneAndUpdate({
            userID: message.member.id
        },
        {
            userID: message.member.id,
            profileBal: parseInt(bal) - parseInt(args[1]),
            $inc: {
                profileBank: args[1]
            }
        }.then(message.channel.send(`Added ${args[1].toLocaleString()}$ to ${message.author.username}`)))
        return undefined
    }
}