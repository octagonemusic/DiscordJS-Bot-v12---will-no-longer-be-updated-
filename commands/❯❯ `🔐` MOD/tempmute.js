const Discord = require('discord.js')
const ms = require('ms')
const Schema = require('../../schemas/mute-schema')
module.exports = {
    name : 'tempmute',
    /**
     * @param {Message} message
     */
    usage: "<member> <time>",
    description: `Temporarily mutes the mentioned user.

__**NOTE:**__ You cannot unmute the temporarily muted user until the timer ends.`,
    run : async(client, message, args) => {
        const { guild } = message
		const role = guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
		const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
		const time = args[1]
        const reason = args.slice(2).join(" ")
        if(!time) {
			message.channel.send("Please specify time.") 
		}
		if (!reason) {
			reason === "No reason specified"
		}
		if (!message.member.hasPermission('MANAGE_MESSAGES')) {
			const embed = new Discord.MessageEmbed()
				.setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
				.setTitle('❌ __Error!__')
				.setDescription('**You do not have the permission to mute members.**')
				.setColor('RANDOM')
				.setTimestamp()
			message.channel.send(embed)


		} else if (!Member) {
			const rembed = new Discord.MessageEmbed()
				.setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
				.setTitle('❌ __Error!__')
				.setDescription('**Please specify someone to mute.**')
				.setColor('RANDOM')
				.setTimestamp()
			message.channel.send(rembed)
		} else if (Member.roles.cache.has(role.id)) {
			const rrembed = new Discord.MessageEmbed()
				.setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
				.setTitle('❌ __Error!__')
				.setDescription(`**${Member.displayName} is already muted.**`)
				.setColor('RANDOM')
				.setTimestamp()
			message.channel.send(rrembed)
		} else if (Member.hasPermission("KICK_MEMBERS")) {
			const embed = new Discord.MessageEmbed()
				.setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
				.setTitle('❌ __Error!__')
				.setDescription('**You cannot mute Admins and Moderators.**')
				.setColor('RANDOM')
				.setTimestamp()
			message.channel.send(embed)
		} else {
			await Member.roles.add(role);
			await Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
				if (!data) {
					new Schema({
						Guild: message.guild.id,
						Users: Member.id,
					}).save()
				} else {
					data.Users.push(Member.id)
					data.save()
				}
			})

			const rrrembed = new Discord.MessageEmbed()
				.setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
				.setTitle('🔇 __Muted!__')
				.setDescription(`** \`${Member.displayName}\` has been muted.**\n\n**__Reason:__** \`${reason}\``)
				.setColor('RANDOM')
				.setFooter(`Muted by ${message.author.username}`, message.author.displayAvatarURL())
				.setTimestamp()
			message.channel.send(rrrembed)
			Member.send(rrrembed)
			guild.channels.cache.get('832524541883580426').send(rrrembed)
		}
	
    

        setTimeout(async () => {
            await Member.roles.remove(role)
            await Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
                const user = data.Users.findIndex((prop) => prop === Member.id)
                data.Users.splice(user, 1)
                data.save()
            })
            message.guild.channels.cache.get('832524541883580426').send(`${Member.user.tag} is now unmuted.`)
            Member.send(`You have now been unmuted in ${message.guild.name}.`)
        }, ms(time))
    }
}