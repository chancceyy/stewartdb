const ms = require('parse-ms')
const profileSchema = require('../../models/profile')
const cooldownSchema = require('../../models/cooldown')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'rob',
    descrirption: 'Rob someone!',
    async execute(message, args, client) {
        const member = message.member
        const mention = message.mentions.members.first()
        if (!mention) return message.channel.send('Please mention a user you want to rob!')

        const MemberSchema = await profileSchema.findOne({
            userID: member.id 
        })
        const mentionedSchema = await profileSchema.findOne({
            userID: mention.id
        })
        const cooldowns = await cooldownSchema.findOne({
            userID: member.id
        })

        if (!MemberSchema) return message.channel.send(`You don't have a profile! To create one do !newprofile!`)
        if (!mentionedSchema) return message.channel.send('The mentioned member does not have a profile!')

        if (!cooldowns) {
            await cooldownSchema.create({
                userID: member.id,
                robCooldown: 'null'
            })
            return message.channel.send('Please try that again!')
        }

        const memberBal = MemberSchema.profileBal
        const mentionedBal = mentionedSchema.profileBal

        const random = (min, max) => {
            return Math.floor(Math.random() * (max - min) ) + min
        }
        const timeout = 1800000; 

        let options = [
            'Success',
            'Failed',
            'Paid'
        ]
        let robbed = random(0, parseInt(options.length))
        let final = options[robbed]
        const robtime = await cooldowns.robCooldown

        if (robtime !== null && timeout - (Date.now() - robtime) > 0) {
            const timeleft = ms(timeout - (Date.now() - robtime))

            const embed = new MessageEmbed()
            .setAuthor(`${member.user.username} Robbed!`)
            .setDescription(`Already robbed, Rob Again in **${timeleft.minutes}** minutes and **${timeleft.seconds}** seconds!`)
            message.channel.send(embed)
        } else {
            if (memberBal < 2000) return message.reply(`You need atleast $2000 in your wallet to rob someone!`)
            else if (mentionedBal < 0) return message.reply('Mentioned user does not have money in their walet!')
            else if (mentionedBal < 2000) return message.reply('Mentioned user does not have $2000 in their balence!')
            else {
                if (final === 'Success') {
                    const amount = Math.floor(Math.random() * 1400) + 100
                    const embed = new MessageEmbed()
                    .setAuthor(`${member.user.username} has robbed ${mention.user.username}!`)
                    .setDescription(`They got away with **$${amount}!**`)
                    message.channel.send(embed)
                    await profileSchema.findOneAndUpdate({
                        userID: member.id,
                    },
                    {   
                        $inc: {
                            profileBal: amount
                        }
                    })
                    
                    await profileSchema.findOneAndUpdate({
                        userID: mention.id,
                    },
                    {
                        profileBal: mentionedBal - amount
                    })

                    await cooldownSchema.findOneAndUpdate({
                        userID: member.id,
                    }, 
                    {
                        robCooldown: Date.now()
                    })
                } else if (final === 'Failed') {
                    const embed1 = new MessageEmbed()
                    .setAuthor(`${member.user.username} robbed ${mention.user.username}`)
                    .setDescription(`They tried to rob..but failed!`)
                    message.channel.send(embed1)
                    await cooldownSchema.findOneAndUpdate({
                        userID: member.id,
                    }, 
                    {
                        robCooldown: Date.now()
                    })
                } else if (final === 'Paid') {
                    const amount = Math.floor(Math.random() * 1400) + 100
                    const embed2 = new MessageEmbed()
                    .setAuthor(`${member.user.username} tried to rob ${mention.user.username}`)
                    .setDescription(`They got caught and had to pay **$${amount}**`)
                    message.channel.send(embed2)
                    await profileSchema.findOneAndUpdate({
                        userID: mention.id,
                    },
                    {
                        $inc: {
                            profileBal: amount
                        }
                    })
                    await profileSchema.findOneAndUpdate({
                        userID: member.id
                    },
                    {
                        profileBal: memberBal - amount
                    })
                    await cooldownSchema.findOneAndUpdate({
                        userID: member.id,
                    }, 
                    {
                        robCooldown: Date.now()
                    })
                }
            }
        }
    }
}