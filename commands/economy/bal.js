const { MessageEmbed } = require('discord.js');
const db = require('mongoose')
const profileSchema = require('../../models/profile');

module.exports = {
    name: 'bal',
    description: 'Bal',
    async execute(message, args, client) {
        const member = message.mentions.members.first() || message.member

        const Profile = await profileSchema.findOne({
            userID: member.id 
        })

        const profileError = new MessageEmbed()
        .setAuthor(`Error checking the bal!`)
        .setDescription(`${member.user.username} does not have a profie!`)
        .setColor(`RED`)
        
        if (!Profile) return message.channel.send(profileError)

        const bal = Profile.profileBal
        const bank = Profile.profileBank

        const embed = new MessageEmbed()
        .setAuthor(`${Profile.profileName}'s Business!`, member.user.displayAvatarURL())
        .setDescription(`**Balance:** $**${bal.toLocaleString()}**\n**Bank:** $**${bank.toLocaleString()}**`)
        .setColor('YELLOW')
        .setFooter(`Command was by ${message.author.username}`)
        .setTimestamp()
        return message.channel.send(embed)
    }
}