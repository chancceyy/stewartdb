const ms = require('parse-ms');
const cooldownSchema = require('../../models/cooldown');
const profileSchema = require('../../models/profile')
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'daily',
    description: 'Daily reward',
    async execute(message, args, client) {

            let timeout = 86400000 ;
            let amount = 200;


            const noProfileError = new MessageEmbed()
            .setAuthor(`An error has occured!`)
            .setDescription(`You do not have an account for the economy system!`)
            .setColor('RED')


            const cooldown = await cooldownSchema.findOne({
                userID: message.author.id
            })
        
            if (!cooldown) return message.channel.send(noProfileError)

            if (cooldown.dailyCooldown !== null && timeout - (Date.now() - cooldown.dailyCooldown) > 0) {
                let time = ms(timeout - (Date.now() - cooldown.dailyCooldown));

                const dailyError = new MessageEmbed()
                .setAuthor(`Error in claiming your daily reward!`)
                .setDescription(`You have already begged! Come back in ${time.days}d, ${time.hours}h, ${time.minutes}m and ${time.seconds}s`)
                .setColor('RED')
                return message.channel.send(dailyError)
            }

            const response = await profileSchema.findOneAndUpdate({
                userID: message.author.id,
            }, 
            {
                $inc: {
                    profileBal: amount
                }
            });

            const begCooldown = await cooldownSchema.findOneAndUpdate({
                userID: message.author.id,
            },
            {
                dailyCooldown: Date.now()
            })

            const dailySuccess = new MessageEmbed()
            .setAuthor(`Successfully claimed the daily reward!`)
            .setDescription(`${message.author.username}, you have claimed your daily reward and recieved $**${amount}**`)
            return message.channel.send(dailySuccess)
        }
    }
