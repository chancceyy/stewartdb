const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'testhelp',
    async execute(message, args, client) {
        const options = {
            limit: 15 * 1000,
            min: 1,
            max: 2, // there will be 2 pages
            page: 1
        }
        const pages = {
            1: { title: ':one:', description: 'This is page one!' }, 
            2: { title: ':two:', description: 'This is page two!' }
        }
        const m = await message.channel.send({ embed: pages[options.page] });

        await m.react('⬅');
        await m.react('➡');
        await m.react('🗑');
        
        const filter = (reaction, user) => {
            return ['⬅', '➡', '🗑'].includes(reaction.emoji.name) && user.id == message.author.id;
        };
        
        const awaitReactions = async (message, m, options, filter) => {
            const { min, max, page, limit } = options;
            
            m.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
            .then(async (collected) => {
                const reaction = collected.first();
                if (reaction.emoji.name === '🗑') {
                    // trash the message instantly, returning so the listener fully stops
                    return await m.delete();
                }
                else {
                    awaitReactions(message, m, options, filter);
                };
            }).catch(() => {});
        }
    }
}