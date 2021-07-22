const db = require('mongoose')
const profileSchema = require('../../models/profile');
const cooldownSchema = require('../../models/cooldown');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'deleteprofile',
    description: 'Create a profile!',
    async execute(message, args, client) {

        const existingProfile = await profileSchema.findOne({
            userID: message.author.id 
        })

        const noProfileError = new MessageEmbed()
        .setAuthor(`Error, no profile detected!`)
        .setDescription(`You do not have a profile, therefore you can't delete one`)
        .setColor('GREEN')
        if (!existingProfile) return message.channel.send(noProfileError)

        const approveDeletion = new MessageEmbed()
        .setAuthor(`Are you sure?`)
        .setDescription(`Are you sure you want to delete your profile? ***You will loose ALL your progress/coins!***`)
        .setColor('RED')
        const msg = await message.channel.send(approveDeletion)
        await msg.react('✅')
        await msg.react('❌')

        const filter = (reaction, user) => {
            return (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && user.id === message.author.id
        }

        msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(async reaction => {
                if (reaction.first().emoji.name === '✅') {
                    await profileSchema.findOneAndDelete({
                        userID: message.author.id
                    })
                    await cooldownSchema.findOneAndDelete({
                        userID: message.author.id
                    })
                    const approvedDeletion = new MessageEmbed()
                    .setAuthor(`Approved!`)
                    .setColor('GREEN')
                    .setDescription(`I have now successfully completed your profile deletion!`)
                    return msg.edit(approvedDeletion).then(msg.reactions.removeAll())
                }
                if (reaction.first().emoji.name === '❌') {
                    const declinedDeletion = new MessageEmbed()
                    .setAuthor(`Declined!`)
                    .setColor('GREEN')
                    .setDescription(`I have now cancelled your profile deletion!`)
                    return msg.edit(declinedDeletion).then(msg.reactions.removeAll())
                }
            })
            .catch((error) => {
                const errorDeletion = new MessageEmbed()
                .setAuthor(`Error!`)
                .setDescription(`I have now cancelled your profile deletion due to your running out of time to react!`)
                .setColor('RED')
                return msg.edit(errorDeletion).then(msg.reactions.removeAll())
            })
    }
}