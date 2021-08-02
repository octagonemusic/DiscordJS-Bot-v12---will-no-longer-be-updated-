const warnSchema = require('../../schemas/warn-schema')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name :'warn',
    /**
     * @param {Message} message
     */
    timeout: 5,
    description: "Warns the mentioned user.",
    usage: "<member>",
    run : async(client, message, args) => {
        const { guild } = message
        const octagone = message.client.users.cache.get('717166815943327764')
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('You do not have permissions to use this command.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('User not found.')
        if (user.id === octagone.id) return message.channel.send('go kys')
        const reason = args.slice(1).join(" ")
        if(!reason) return message.channel.send('Please specify a reason')
        warnSchema.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new warnSchema({
                    guildid: message.guild.id,
                    user : user.user.id,
                    content : [
                        {
                            moderator : message.author.id,
                            reason : reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason : reason
                }
                data.content.push(obj)
            }
            data.save()
        });
        user.send(new MessageEmbed()
        .setAuthor(guild.name)
        .setTitle('⚠ __Warned!__')
        .setDescription(`**You were warned in ${guild.name}**\n\n**__Reason:__** \`${reason}\``)
        .setColor('RED')
        )
        message.channel.send(new MessageEmbed()
            .setAuthor(guild.name)
            .setTitle('⚠ __Warned!__')
            .setDescription(`**Warned ${user}**\n\n**__Reason:__** \`${reason}\``)
            .setColor('BLUE')
            .setFooter(`Warn issued by ${message.author.tag}`)
        )
        guild.channels.cache.get('832524541883580426').send(new MessageEmbed()
        .setAuthor(guild.name)
        .setTitle('⚠ __Warned!__')
        .setDescription(`**${message.author.tag} warned ${user}**\n\n**__Reason:__** \`${reason}\``)
        .setColor('RANDOM')
        .setFooter(`Warn issued by ${message.author.tag}`)
    )
    }
}