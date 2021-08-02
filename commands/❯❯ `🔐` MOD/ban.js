const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'ban',
    description: 'Bans the mentioned member.',
    timeout: 5,
    usage: '<member>',
    run: async (client, message, args) => {

        const { guild } = message

        const prefix = "?"

        const reason = message.content.slice(prefix.length).trim().split(/ +/g)

        const rreason = args.slice(1).join(" ")


        if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(
            new MessageEmbed()
                .setAuthor(guild.name)
                .setTitle('❌ __Error!__')
                .setDescription('**I do not have permissions to ban members!**')
                .setColor('RED')
                .setTimestamp()
        )

        const Member = message.mentions.members.first()

        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(
            new MessageEmbed()
                .setAuthor(guild.name)
                .setTitle('❌ __Error!__')
                .setDescription('**You do not have the permission to ban members.**')
                .setColor('RED')
                .setTimestamp()
        )



        if (!Member) return message.channel.send(
            new MessageEmbed()
                .setAuthor(guild.name)
                .setTitle('❌ __Error!__')
                .setDescription('**Please specify someone to ban!**')
                .setColor('RED')
                .setTimestamp()
        )

        if (Member.hasPermission("KICK_MEMBERS")) return message.channel.send(
            new MessageEmbed()
                .setAuthor(guild.name)
                .setTitle('❌ __Error!__')
                .setDescription('**You cannot ban Admins and Moderators!**')
                .setColor('RED')
                .setTimestamp()
        )



        await Member.ban({ reason: [...args].splice(1).join(' ') })
        guild.channels.cache.get('832524541883580426').send(new MessageEmbed()
            .setAuthor(guild.name)
            .setTitle('🚫 __Banned!__')
            .setDescription(`**\`${Member.user.tag}\` has been banned.**\n\n**__Reason__: ${rreason}**`)
            .setColor('GREEN')
            .setFooter(`Banned by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp())

        message.channel.send(
            new MessageEmbed()
                .setAuthor(guild.name)
                .setTitle('🚫 __Banned!__')
                .setDescription(`**\`${Member.user.tag}\` has been banned.**\n\n**__Reason__: ${rreason}**`)
                .setColor('GREEN')
                .setFooter(`Banned by ${message.author.username}`, message.author.displayAvatarURL())
                .setTimestamp()
        )
    }
}