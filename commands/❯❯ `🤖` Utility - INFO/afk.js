const mongo = require('../../utils/mongo')
const Discord = require('discord.js')
const { Database } = require('quickmongo')
const { mongoPath } = require('../../config.json')
const mongoDBURL = mongoPath
const quickmongo = new Database(mongoDBURL)

module.exports = {
	name : 'afk',
	description : 'Sets your AFK',
	timeout : 5, 
	usage : "<reason>",
	run : async (client, message, args) => {
		const reason = args.join(' ')
		const AFKPrefix = '[AFK]'
		const oldNickname = message.member.nickname || message.author.username;
      const nickname = `[AFK] ${oldNickname}`

	

		try {
			await quickmongo.set(`afk-${message.author.id}+${message.guild.id}`, reason || 'No AFK reason provided.')

			await quickmongo.set(`afk-${message.author.id}`, oldNickname)

		const embed = new Discord.MessageEmbed()
		.setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
		.setTitle("💤 __AFK!__")	
		.setDescription(`
**Your AFK has been set successfully!**

**__Reason__:** \`${reason}\``)
		.setColor('RANDOM')
		.setFooter(`${message.author.username}`, message.author.displayAvatarURL())
		.setTimestamp()
		message.channel.send(embed)
		} catch (err) {
			console.log(err)
			message.channel.send('👎 **| Could not set AFK status.**')
		}

		try {
			await message.member.setNickname(nickname)
		} catch (err) {
			console.log(err)
		}
	}
}