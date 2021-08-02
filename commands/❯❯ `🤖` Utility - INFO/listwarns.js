  
const warnSchema = require('../../schemas/warn-schema')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name :'listwarns',
    /**
     * @param {Message} message
     */
    description: "Shows the list of warns for the mentioned user.",
    usage: "<member>",
    timeout: 5,
    aliases: ["lw"],
    run : async(client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('Please mention a user.')
        const reason = args.slice(1).join(" ")
        warnSchema.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) console.log(err)
            if(data) {
                message.channel.send(new MessageEmbed()
                    .setTitle(`${user.user.tag}'s warns`)
                    .setDescription(
                        data.content.map(
                            (w, i) => 
                            `\`${i + 1}\` | **__Moderator__:** \`${message.guild.members.cache.get(w.moderator).user.tag}\`\n   **__Reason__:** \`${w.reason}\`\n`
                        )
                    )
                    .setColor("BLUE")
                )
            } else {
                message.channel.send('User has no data')
            }

        })
    }
}