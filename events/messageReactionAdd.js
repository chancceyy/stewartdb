
module.exports = async (client, reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch()
    if (reaction.partial) await reaction.fetch()
    if (user.bot) return

    if (reaction.message.channel.id === '775924026920140801') {
        if (reaction.emoji.name === '💛') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('814134555807318097')
        }
    }
    if (reaction.message.channel.id === '777930761428271135') {
        if (reaction.emoji.name === '👨') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('799746627660546099')
        }
        if (reaction.emoji.name === '👩') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('799746627136782456')
        }
        if (reaction.emoji.name === '🙎') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('799746626184413245')
        }
        if (reaction.emoji.name === '🗨️') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('818559248698179614')
        }
    }
}