
module.exports = async (client, reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch()
    if (reaction.partial) await reaction.fetch()
    if (user.bot) return

    
    if (reaction.message.channel.id === '777930761428271135') {
        if (reaction.emoji.name === '👨') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('799746627660546099')
        }
        if (reaction.emoji.name === '👩') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('799746627136782456')
        }
        if (reaction.emoji.name === '🙎') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('799746626184413245')
        }
        if (reaction.emoji.name === '🗨️') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('818559248698179614')
        }
    }
}