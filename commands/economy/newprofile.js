const db = require('mongoose')
const profileSchema = require('../../models/profile');
const cooldown = require('../../models/cooldown')

module.exports = {
    name: 'newprofile',
    description: 'Create a profile!',
    async execute(message, args, client) {

        const existingProfile = await profileSchema.findOne({
            userID: message.author.id 
        })

        if (existingProfile) return message.channel.send(`You already have a profile! Your profile is called: ${existingProfile.profileName} `)


        message.channel.send('Please specify your business name!')

        const filter = (user) => {
            return user.author.id === message.author.id
        }

        message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(async collected => {
                const name = collected.first().content
                const regex = !/[^a-zA-Z0-9 ]+/g.test(name)

                if (!regex) return message.channel.send('Your business can only contain numbers and letters!');
                const profile = await profileSchema.create({
                    userID: message.author.id,
                    profileName: name,
                    profileBal: 0,
                    profileBank: 0,
                })

                const cooldonSchema = await cooldown.create({
                    userID: message.author.id,
                    begCooldown: 'null',
                    jobCooldown: 'null',
                    dailyCooldown: 'null',
                    weeklyCooldown: 'null',
                    robCooldown: 'null',
                    flipCooldown: 'null'
                })
        
                message.channel.send(`Your business name is: ${profile.profileName}`)
            })
            .catch(() => {
                return message.channel.send('you ran out of time to specify a business name!')
            })
    }
}