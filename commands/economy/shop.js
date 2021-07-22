const { MessageEmbed } = require('discord.js')
const shopSchema = require('../../models/shop')
const profileSchema = require('../../models/profile')
const ms = require('parse-ms')

module.exports = {
    name: 'shop',
    description: 'Shows the shop',
    async execute(message, args, client) {

        const hopes = client.users.cache.find(user => user.id === '751627844345397249')
        
        const gameEna = await shopSchema.findOne({
            guildID: message.guild.id
        })

        if (!gameEna) await shopSchema.create({
            guildID: message.guild.id,
            gameShop: 'true',
            twitchStatus: 'false',
        })

        const profile = await profileSchema.findOne({
            userID: message.author.id
        })

        if (!profile) {
            return message.chanenl.send('Please create a profile with !profile')
        }

        if (gameEna.twitchStatus !== 'false') {
            return message.channel.send('You cannot buy as Hopes is streaming!')
        }
        const noProfileError = new MessageEmbed()
        .setAuthor(`An error has occured!`)
        .setDescription(`You do not have an account for the economy system!`)
        .setColor('RED')


        if (!profile) return message.channel.send(noProfileError)

        if (!args[1]) {
        const shopEmbed = new MessageEmbed()
        .setAuthor(`Shop!`)
        .setDescription(`
!shop game -> 10k coins | Chooses the game for an hour.
!shop light -> 2k coins | Choose if the lights are off or on.
!shop make-up -> 15k coins | Make Hopes do a Make-Up stream.
!shop notification -> 50k coins | Choose the stream notification.
        `)
        .setColor('YELLOW')

        return message.channel.send(shopEmbed)
        } else if(args[1] === 'game') {
            //Shop, game
            const gameTimeout = 2629800000

            if (gameEna.gameCooldown !== null && gameTimeout - (Date.now() - gameEna.gameCooldown) > 0) {
                let time = ms(gameTimeout - (Date.now() - gameEna.gameCooldown));

                const gameError = new MessageEmbed()
                .setAuthor(`Error in buying the game item in the shop`)
                .setDescription(`This has already been bought! Come back in ${time.days}d, ${time.hours}h, ${time.minutes}m and ${time.seconds}s`)
                .setColor('RED')
                return message.channel.send(gameError)
            }
           
            if (profile.profileBal < 10000) {
                return message.channel.send('Sorry, you can not buy the select game on the shop. This is due to you having less than 10000 coins!')
            }
        
            const gameShopUpdate = await shopSchema.findOneAndUpdate({
                guildID: message.guild.id,
            },
            {
                gameCooldown: Date.now(),
                gameShop: 'false'
            })

            const profieUpdate = await profileSchema.findOneAndUpdate({
                userID: message.member.id,
            }, {
                profileBal: parseInt(profile.profileBal) - parseInt(10000)
            })

            const boughtGameSuccess = new MessageEmbed()
            .setAuthor(`Successfully claimed the select game!`)
            .setDescription(`${message.author.username}, you have bought the game item. Contact Hopes for further information.`)
            client.users.fetch('751627844345397249').then((user) => {
                user.send(`${message.author.username} has bought game! Please dm them <@${message.author.id}>`);
            });            
            return message.channel.send(boughtGameSuccess)

            // end of shop game
        } else if(args[1] === 'lights') {
            const lightTimeout = 3600000

            if (gameEna.lightCooldown !== null && lightTimeout - (Date.now() - gameEna.lightCooldown) > 0) {
                let time = ms(lightTimeout - (Date.now() - gameEna.lightCooldown));

                const lightsError = new MessageEmbed()
                .setAuthor(`Error in buying the light item in the shop`)
                .setDescription(`This has already been bought! Come back in ${time.minutes}m and ${time.seconds}s`)
                .setColor('RED')
                return message.channel.send(lightsError)
            }
           
            if (profile.profileBal < 2000) {
                return message.channel.send('Sorry, you can not buy the select lights on the shop. This is due to you having less than 2000 coins!')
            }
        
            const gameShopUpdate = await shopSchema.findOneAndUpdate({
                guildID: message.guild.id,
            },
            {
                lightCooldown: Date.now(),
            })

            const profieUpdate = await profileSchema.findOneAndUpdate({
                userID: message.member.id,
            }, {
                profileBal: parseInt(profile.profileBal) - parseInt(2000)
            })

            const boughtLightsSuccess = new MessageEmbed()
            .setAuthor(`Successfully claimed the select lights (On/off)!`)
            .setDescription(`${message.author.username}, you have bought the game item. Contact Hopes for further information.`)
            client.users.fetch('751627844345397249').then((user) => {
                user.send(`${message.author.username} has bought lights! Please dm them <@${message.author.id}>`);
            });            
            return message.channel.send(boughtLightsSuccess)
        } else if (args[1] === 'makeup') {
            const makeupTimeout = 7889400000

            if (gameEna.makeupCooldown !== null && makeupTimeout - (Date.now() - gameEna.makeupCooldown) > 0) {
                let time = ms(makeupTimeout - (Date.now() - gameEna.makeupCooldown));

                const lightsError = new MessageEmbed()
                .setAuthor(`Error in buying the makeup item in the shop`)
                .setDescription(`This has already been bought! Come back in ${time.days}d,${time.hours}h, ${time.minutes}m and ${time.seconds}s`)
                .setColor('RED')
                return message.channel.send(lightsError)
            }
           
            if (profile.profileBal < 15000) {
                return message.channel.send('Sorry, you can not buy the makeup stream on the shop. This is due to you having less than 15000 coins!')
            }
        
            const gameShopUpdate = await shopSchema.findOneAndUpdate({
                guildID: message.guild.id,
            },
            {
                makeupCooldown: Date.now(),
            })

            const profieUpdate = await profileSchema.findOneAndUpdate({
                userID: message.member.id,
            }, {
                profileBal: parseInt(profile.profileBal) - parseInt(15000)
            })

            const boughtMakeupSuccess = new MessageEmbed()
            .setAuthor(`Successfully claimed the makeup stream!`)
            .setDescription(`${message.author.username}, you have bought the makeup stream. Contact Hopes for further information.`)
            client.users.fetch('751627844345397249').then((user) => {
                user.send(`${message.author.username} has bought makeup stream! Please dm them <@${message.author.id}>`);
            });            
            return message.channel.send(boughtMakeupSuccess)
        } else if (args[1] === 'notification') {
            const notificationTimeout = 1209600033.12

            if (gameEna.notificationCooldown !== null && notificationTimeout - (Date.now() - gameEna.notificationCooldown) > 0) {
                let time = ms(notificationTimeout - (Date.now() - gameEna.notificationCooldown));

                const lightsError = new MessageEmbed()
                .setAuthor(`Error in buying the notification item in the shop`)
                .setDescription(`This has already been bought! Come back in ${time.days}d,${time.hours}h, ${time.minutes}m and ${time.seconds}s`)
                .setColor('RED')
                return message.channel.send(lightsError)
            }
           
            if (profile.profileBal < 50000) {
                return message.channel.send('Sorry, you can not buy the notification on the shop. This is due to you having less than 50000 coins!')
            }
        
            const gameShopUpdate = await shopSchema.findOneAndUpdate({
                guildID: message.guild.id,
            },
            {
                notificationCooldown: Date.now(),
            })

            const profieUpdate = await profileSchema.findOneAndUpdate({
                userID: message.member.id,
            }, {
                profileBal: parseInt(profile.profileBal) - parseInt(50000)
            })

            const boughtNotificationSuccess = new MessageEmbed()
            .setAuthor(`Successfully claimed the notification!`)
            .setDescription(`${message.author.username}, you have bought the notification. Contact Hopes for further information.`)
            client.users.fetch('751627844345397249').then((user) => {
                user.send(`${message.author.username} has bought notification! Please dm them <@${message.author.id}>`);
            });            
            return message.channel.send(boughtNotificationSuccess)
        }
    }
}