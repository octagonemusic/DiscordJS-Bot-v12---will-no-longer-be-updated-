const Discord = require('discord.js')
module.exports = {
    name : 'avatar',
    aliases : ['av'],
    timeout : 5, 
    usage : "<member>",
    description : "Shows the enlarged version of your's or the mentioned member's profile picture",
    run : (client, message, args) => {
        const member = message.mentions.members.first() || message.member
        const embed = new Discord.MessageEmbed()
            .setTitle(`${member.user.tag}'s avatar:`)
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setColor("RANDOM")

        message.channel.send(embed)
    }
}