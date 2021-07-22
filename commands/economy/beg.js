const Profile = require('../../models/profile');
const ms = require('parse-ms');
const cooldownSchema = require('../../models/cooldown');
const profieSchema = require('../../models/profile')
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'beg',
    description: 'Beg for some money',
    async execute(message, args, client) {

        let timeout = 300000;

        const profie = await profieSchema.findOne({
            userID: message.author.id
        })

        const noProfileError = new MessageEmbed()
            .setAuthor(`An error has occured!`)
            .setDescription(`You do not have an account for the economy system!`)
            .setColor('RED')

        if (!profie) return message.channel.send(noProfileError)

        const cooldown = await cooldownSchema.findOne({
            userID: message.author.id
        })
        
        if (!cooldown) await cooldownSchema.create({
            userID: message.author.id,
            begCooldown: 'null'
        })
    
        if (cooldown.begCooldown !== null && timeout - (Date.now() - cooldown.begCooldown) > 0) {
            let time = ms(timeout - (Date.now() - cooldown.begCooldown));

            const begError = new MessageEmbed()
            .setAuthor(`Error begging!`)
            .setDescription(`You have already begged! Come back in **${time.minutes}** minutes and **${time.seconds}** seconds`)
            .setColor('RED')
            return message.channel.send(begError)
        }

        const randomCoins = Math.floor(Math.random() * 100) + 1;
        const response = await Profile.findOneAndUpdate({
            userID: message.author.id,
        }, 
        {
            $inc: {
                profileBal: randomCoins
            }
        });

        const begCooldown = await cooldownSchema.findOneAndUpdate({
            userID: message.author.id,
        },
        {
            begCooldown: Date.now()
        })

        const begSuccess = new MessageEmbed()
        .setAuthor(`Successful at begging!`)
        .setColor('GREEN')
        .setDescription(`${message.author.username}, you have beegged and you have recieved $**${randomCoins}**!`)
        return message.channel.send(begSuccess)
    }
}