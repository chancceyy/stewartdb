const Discord = require('discord.js')
const { prefix } = require('../config.json')

module.exports = (client, message) => {
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    const args = message.content.substring(prefix.length).split(" ")

    const command = client.commands.get(args[0])
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]))
    
    if (!command) return;
    
    try {
        command.execute(message, args, client)
    } catch(error) {
        console.log(error)
    }
}