const Discord = require('discord.js')

module.exports = {
	name: 'chill',
	description: 'Locks the channel the command is used in.',
	timeout: 5,
	aliases: ["lock"],
	run: async (client, message, args) => {
		if (!message.member.hasPermission("KICK_MEMBERS")) {
			const embed = new Discord.MessageEmbed()
				.setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
				.setTitle('❌ __Error!__')
				.setDescription('**👎 You do not have the permission to chill channels.**')
				.setColor('RANDOM')
				.setTimestamp()
			message.channel.send(embed)
		} else {

			const role = message.guild.roles.cache.get('832475545362497567');
			let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
			if (!lockChannel) lockChannel = message.channel;

			await lockChannel.updateOverwrite(role, {
				SEND_MESSAGES: false
			}).catch(err => console.log(err));
			const rembed = new Discord.MessageEmbed()
				.setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
				.setTitle('❄ __Chilled!__')
				.setDescription(`**👍 This channel has been chilled!**`)
				.setColor('RANDOM')
				.setFooter(`Chilled by ${message.author.username}`, message.author.displayAvatarURL())
				.setTimestamp()
			message.channel.send(rembed)
		}
	}
}