module.exports = {
    name: 'customstatus',
    description: 'Give the bot a custom status',
    execute(message, args, client) {
        const args1 = args[2]
        const msg = args.slice(2).join(" ");

        let staffRole = message.guild.roles.cache.find(r => r.name === "Staff")

        if (!message.member.roles.cache.has(staffRole.id)) {
            return message.channel.send('<:no:827179733929689170> Only staff can add a custom status!')
        }

        if (!args[1]) {
            return message.channel.send('Please choose either PLAYING or WATCHING')
        }
        client.user.setActivity(`${msg}`, { type: `${args[1]}`});
        return message.channel.send(`<:check:827179702996697088> The bot status is now ${args[1]} ${msg}`)
    }
}