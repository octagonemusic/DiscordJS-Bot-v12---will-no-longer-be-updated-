const Discord = require('discord.js')
const { Message } = require('discord.js')
const mongo = require('../../utils/mongo.js')
const Schema = require('../../schemas/mute-schema')

module.exports = {
    name: 'unmute',
	description: 'Unmutes the mentioned user.',
	usage: '<member>',
	timeout: 5, 
    run: async(client, message, args) => {
		const { guild } = message
			const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
			const role = guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

			if (!message.member.hasPermission('MANAGE_MESSAGES')) {
				const embed = new Discord.MessageEmbed()
					.setAuthor(guild.name)
						.setTitle('❌ __Error!__')
						.setDescription('**👎 You do not have the permission to unmute members.**')
						.setColor('RANDOM')
						.setTimestamp()
              message.channel.send(embed)
			} else if(!Member) {
				const rembed = new Discord.MessageEmbed()
						.setAuthor(guild.name)
						.setTitle('❌ __Error!__')
						.setDescription('**👎 Please specify someone to unmute.**')
						.setColor('RANDOM')
						.setTimestamp()
              message.channel.send(rembed)
			} else {
        
				
    await Schema.findOne({
					Guild: message.guild.id, 
				}, 
				async(err, data) => {
					const user = data.Users.findIndex((prop) => prop === Member.id)
					if(!data) { 
					const rrembed = new Discord.MessageEmbed()
						.setAuthor(guild.name)
						.setTitle('❌ __Error!__')
						.setDescription(`**\`🔊 ${Member.displayName}\` is not muted.**`)
						.setColor('RANDOM')
						.setTimestamp()
              message.channel.send(rrembed)
				
					} else 	
					
					if (user == -1) {
					const rrrembed = new Discord.MessageEmbed()
						.setAuthor(guild.name)
						.setTitle('❌ __Error!__')
						.setDescription(`**🔊 \`${Member.displayName}\` is not muted.**`)
						.setColor('RANDOM')
						.setTimestamp()
              message.channel.send(rrrembed)
					} else { 

							data.Users.splice(user, 1)
					data.save()
					await Member.roles.remove(role)
				 const rrrrembed = new Discord.MessageEmbed()
						.setAuthor(guild.name)
						.setTitle('🔊 __Unmuted!__')
						.setDescription(`**👍 \`${Member.displayName}\` has been unmuted.**`)
						.setColor('RANDOM')
						.setFooter(`Unmuted by ${message.author.username}`, message.author.displayAvatarURL())
						.setTimestamp()
            message.channel.send(rrrrembed)
			Member.send(rrrrembed)
			guild.channels.cache.get('832524541883580426').send(rrrrembed)
				}
				}
				) 
}
				
    }
}	