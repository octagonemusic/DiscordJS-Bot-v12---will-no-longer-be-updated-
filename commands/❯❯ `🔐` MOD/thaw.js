const Discord = require('discord.js')
module.exports = {
  name: 'thaw',
  aliases: ['unlock'],
  description: "Locks the channel the command is used in.",
  timeout: 5,
  run: async(client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")){ 
		const embed = new Discord.MessageEmbed()
					.setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
						.setTitle('❌ __Error!__')
						.setDescription('**👎 You do not have the permission to thaw channels.**')
						.setColor('RANDOM')
						.setTimestamp()
              message.channel.send(embed)
		} else {
    const role = message.guild.roles.cache.get('832475545362497567');
    let unlockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if(!unlockChannel) unlockChannel = message.channel;

    await unlockChannel.updateOverwrite(role, {
      SEND_MESSAGES: true
    }).catch(err => console.log(err));
    const rembed = new Discord.MessageEmbed()
						.setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
						.setTitle('🔥 __Thawed!__')
						.setDescription(`**👍 This channel has been thawed!**`)
						.setColor('RANDOM')
						.setFooter(`Thawed by ${message.author.username}`, message.author.displayAvatarURL())
						.setTimestamp()
            message.channel.send(rembed)
  }
	}
}