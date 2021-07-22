const profileSchema = require('../../models/profile')
const cooldownSchema = require('../../models/cooldown')
const { MessageEmbed } = require('discord.js')
const ms = require('parse-ms')

module.exports = {
    name: 'flip',
    description: 'Try to flip your money:)',
    async execute(message, args, client) {

        const Profile = await profileSchema.findOne({
            userID: message.author.id
        })

        const noProfileError = new MessageEmbed()
        .setAuthor(`An error has occured!`)
        .setDescription(`You do not have an account for the economy system!`)
        .setColor('RED')

        if (!Profile) return message.channel.send(noProfileError)


        const cooldowns = await cooldownSchema.findOne({
            userID: message.author.id,
        })

        if (!cooldowns.flipCooldown) await cooldownSchema.create({
            userID: message.author.id,
            flipCooldown: 'null',
        })


        const bal = Profile.profileBal;

        if (!args[1]) return message.channel.send('How much money do you want to fip?')
        if (bal < args[1]) return message.channel.send('You do not have enough money in your balance to flip that much!')
        if (isNaN(args[1]) || args[1] < 0) return message.channel.send('You need to specify an amount of money to deposit that is above 0!')

        const random = (min, max) => {
            return Math.floor(Math.random() * (max - min) ) + min
        }
        const timeout = 1800000; 

        let options = [
            'Success',
            'Failed',
            'Success',
            'Failed',
            'Failed',
            'Success'
        ]
        let fipped = random(0, parseInt(options.length))
        let final = options[fipped]
        const fliptime = await cooldowns.flipCooldown

        if (fliptime !== null && timeout - (Date.now() - fliptime) > 0) {
            const timeleft = ms(timeout - (Date.now() - fliptime))

            const embed = new MessageEmbed()
            .setAuthor(`${message.author.username}:`)
            .setDescription(`You have already used the flip command. Try again in **${timeleft.minutes}** minutes and **${timeleft.seconds}** seconds!`)
            return message.channel.send(embed)
        } else {
            if (args[1] > 10000) return message.reply(`Sorry, you can only flip 10000 at a time`)
            else if (bal < 0) return message.reply('Sorry you don\'t have enough money in your balance to run this!')
            else {
                if (final === 'Success') {
                    const embed = new MessageEmbed()
                    .setAuthor(`Congrats ${message.author.username}!`)
                    .setDescription(`You have doubled your money! You now won $**${args[1] * 2}**`)
                    message.channel.send(embed)
                    await profileSchema.findOneAndUpdate({
                        userID: message.author.id,
                    },
                    {   
                        $inc: {
                            profileBal: args[1]
                        }
                    })

                    await cooldownSchema.findOneAndUpdate({
                        userID: message.author.id,
                    }, 
                    {
                        flipCooldown: Date.now()
                    })
                } else {
                    if (final === 'Failed') {
                        const embed = new MessageEmbed()
                        .setAuthor(`Unlucky ${message.author.username}!`)
                        .setDescription(`You have lost your $**${args[1]}**`)
                        message.channel.send(embed)
                        await profileSchema.findOneAndUpdate({
                            userID: message.author.id,
                        },
                        {
                            profileBal: parseInt(bal) - parseInt(args[1])
                        })

                        await cooldownSchema.findOneAndUpdate({
                            userID: message.author.id
                        }, 
                        {
                            flipCooldown: Date.now()
                        })
                    }
                }
            }
        }
    }
}
