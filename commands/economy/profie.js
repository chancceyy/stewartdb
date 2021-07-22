const profileSchema = require('../../models/profile')
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'profile',
    description: 'Show someone\'s business',
    async execute(message, args, client) {
        const member = message.mentions.members.first() || message.member;

        const profile = await profileSchema.findOne({
            userID: member.id,
        })

        if (!profile) {
            return message.channel.send('Create a profile with !newprofile')
        }
    
        const balence = profile.profileBal
        const bank = profile.profileBank
        const name = profile.profileName

        const embed = new MessageEmbed()
        .setAuthor(`${member.user.username}'s Business!`)
        .setColor('YELLOW')
        .setDescription(`
Business Name: **${name}**,
Balance: $**${balence}**,
Bank: $**${bank}**,
Altogether: $**${parseInt(bank) + parseInt(balence)}** 
        `)
        message.channel.send(embed)

    }
}