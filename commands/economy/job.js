const Profile = require('../../models/profile');
const ms = require('parse-ms');
const cooldownSchema = require('../../models/cooldown');
module.exports = {
    name: 'job',
    description: 'Do a job for money',
    async execute(message, args, client) {

        let timeout = 3600000;

        const cooldown = await cooldownSchema.findOne({
            userID: message.author.id
        })

        if (!cooldown) return message.channel.send('Create a profile with !newprofile')

        if (cooldown.jobCooldown !== null && timeout - (Date.now() - cooldown.jobCooldown) > 0) {
            let time = ms(timeout - (Date.now() - cooldown.jobCooldown));

            return message.channel.send(`You have already done a job! Come back in ${time.hours}h, ${time.minutes}m and ${time.seconds}s`)
        }

        const jobs = ['fisherman', 'postman', 'streamer', 'teacher', 'artist', 'coder','computer scientist']

        const randomCoins = Math.floor(Math.random() * 250) + 1;
        var randomJob = jobs[Math.floor(Math.random() * jobs.length)]
        const response = await Profile.findOneAndUpdate({
            userID: message.author.id,
        }, 
        {
            $inc: {
                profileBal: randomCoins
            }
        });

        const jobCooldown = await cooldownSchema.findOneAndUpdate({
            userID: message.author.id,
        },
        {
            jobCooldown: Date.now()
        })

        return message.channel.send(`${message.author.username}, you have completed the job of a ${randomJob} and recieved $${randomCoins}`)
    }
}