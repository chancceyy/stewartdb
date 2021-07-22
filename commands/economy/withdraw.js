const db = require('mongoose')
const profileSchema = require('../../models/profile');

module.exports = {
    name: 'withdraw',
    description: 'Withdraw money out of the bank',
    async execute(message, args, client) {
        const member = message.member;
    
        const Profile = await profileSchema.findOne({
            userID: message.author.id
        })

        if (!Profile) {
            return message.channel.send('Create a profile with !newprofile')
        }


        if (!args[1]) return message.channel.send('You need to specify a number to add!')
        if (isNaN(args[1]) || args[1] < 0) return message.channel.send('You need to specify an amount of money to deposit that is above 0!')

        const bal = Profile.profileBal
        const bank = Profile.profileBank

        if (bank < args[1]) return message.channel.send('You don\'t have enough money to withdraw!')

        await profileSchema.findOneAndUpdate({
            userID: message.member.id
        },
        {
            userID: message.member.id,
            $inc: {
                profileBal: args[1]
            },
            profileBank: parseInt(bank) - parseInt(args[1])
        })


        return message.channel.send(`Added ${args[1].toLocaleString()}$ to ${Profile.profileName}'s balence`)
    }
}