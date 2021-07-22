const discord = require('discord.js')
const profileSchema = require('../../models/profile')
const cooldownSchema = require('../../models/cooldown')
const ms = require('parse-ms')
module.exports = {
	name: "rps",
	description: "play a game of rock, paper and scissors",
	async execute(message, args, client) {
		let embed = new discord.MessageEmbed()
		.setTitle("RPS GAME")
		.setDescription("React to play!")
		.setTimestamp()
		let msg = await message.channel.send(embed)
		await msg.react("🪨")
		await msg.react("✂")
		await msg.react("📰")
		
		const profile = await profileSchema.findOne({
			userID: message.author.id
		})

		if (!profile) {
			return message.channel.send('Create a profile with !newprofile')	
		}

			const filter = (reaction, user) => {
				return ['🪨', '✂', '📰'].includes(reaction.emoji.name) && user.id === message.author.id;
			}
	
			const randomCoins = Math.floor(Math.random() * 249) + 1 
	
			const choices = ['🪨', '✂', '📰']
			const me = choices[Math.floor(Math.random() * choices.length)]
			msg.awaitReactions(filter, {max:1, time: 60000, error: ["time"]}).then(
				async(collected) => {
					const reaction = collected.first()
					let result = new discord.MessageEmbed()
					.setTitle("RESULT")
					.addField("Your choice", `${reaction.emoji.name}`)
					.addField("My choice", `${me}`)
				.setColor('#FFFF00')
				await msg.edit(result)
					if ((me === "🪨" && reaction.emoji.name === "✂") ||
					(me === "📰" && reaction.emoji.name === "🪨") ||
					(me === "✂" && reaction.emoji.name === "📰")) {
						await cooldownSchema.findOneAndUpdate({
							userID: message.author.id,
						},
						{
							rpsCooldown: Date.now()
						})
						return message.reply("You lost!").then(msg => msg.delete({timeout: 10000}))
				} else if (me === reaction.emoji.name) {
					await cooldownSchema.findOneAndUpdate({
						userID: message.author.id,
					},
					{
						rpsCooldown: Date.now()
					})
					return message.reply("It's a tie!").then(msg => msg.delete({timeout: 10000}))
				} else {
					const response = await profileSchema.findOneAndUpdate({
						userID: message.author.id,
					}, 
					{
						$inc: {
							profileBal: randomCoins
						}
					});
					await cooldownSchema.findOneAndUpdate({
						userID: message.author.id,
					},
					{
						rpsCooldown: Date.now()
					})
					return message.reply(`You won! ${randomCoins} coins!`).then(msg => msg.delete({timeout: 10000}))
				}
			})
			.catch(collected => {
					message.reply('Process has been cancelled since you did not respond in time!');
			})
		}
	}