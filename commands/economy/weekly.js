const ms = require('parse-ms');
const cooldownSchema = require('../../models/cooldown');
const profileSchema = require('../../models/profile')
module.exports = {
    name: 'weekly',
    description: 'Weekly reward',
    async execute(message, args, client) {

        let timeout = 604800000;
        let amount = 500;

        const cooldown = await cooldownSchema.findOne({
            userID: message.author.id
        })
    
        if (!cooldown) return message.channel.send('Create an account!')

        if (cooldown.weeklyCooldown !== null && timeout - (Date.now() - cooldown.weeklyCooldown) > 0) {
            let time = ms(timeout - (Date.now() - cooldown.weeklyCooldown));

            return message.channel.send(`You have already begged! Come back in ${time.days}d, ${time.hours}h, ${time.minutes}m and ${time.seconds}s`)
        }

        const response = await profileSchema.findOneAndUpdate({
            userID: message.author.id,
        }, 
        {
            $inc: {
                profileBal: amount
            }
        });

        const begCooldown = await cooldownSchema.findOneAndUpdate({
            userID: message.author.id,
        },
        {
            weeklyCooldown: Date.now()
        })

        return message.channel.send(`${message.author.username}, you have claimed your weekly reward and recieved $${amount}`)
    }
}