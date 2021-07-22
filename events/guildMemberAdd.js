const { MessageEmbed } = require('discord.js')

module.exports = (client, member) => {
    member.guild.channels.cache.get('775925544000028692').send(
    	new MessageEmbed()
        .setAuthor('New Member Has Joined!')
        .setDescription(`Welcome ${member} to HopesBounty's server! We are really glad you are here! Make sure you read the <#775924026920140801> and get your roles <#777930761428271135>! We really hope you enjoy your stay!`)
        .setFooter(`We now have ${member.guild.memberCount} members!`)
       	.setColor('#FFFF00')
    ) 
}