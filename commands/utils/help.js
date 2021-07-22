const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../config.json')
module.exports = {
    name: 'help',
    description: 'Shows all the commands for the bot',
    async execute(message, args, client) {
        const embed = new MessageEmbed()
        .setColor('#FFFF00')
        .setDescription(`
**STEWART'S COMMANDS!! (Prefix is ${prefix}**)

🔨 **UTILS COMMANDS**
-help -> Shows this message!
-goodnight -> Sends a cute goodnight message!

🎲 **GAME COMMANDS**
-rps -> Play rock, paper and sissors!
        
💸 **ECONOMY COMMANDS**
-newprofile -> Start your economy adventure here!
-beg -> Beg and you may recieve money!
-daily -> Get your daily money!
-weekly -> Get your weekly monney!
-flip -> Take your chances to double your money!
-job -> Do a job for some money!
-rob -> Rob someones money!
-withdraw -> Take money out of your bank!
-disposit -> Put money safe inside your bank!
-deleteprofile -> Delete your profie/progress!

⚒️ **STAFF COMMANDS**
-twitch -> Adds the twitch status to the bot!
-customstatus -> Add a custom status to the bot!
        `)
        message.channel.send(embed)
    }
}