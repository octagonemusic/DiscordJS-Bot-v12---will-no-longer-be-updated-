const Discord = require('discord.js')

module.exports = {
    name: 'boosters',
    description: "Shows the list of boosters.",
    run: (client, message, args) => {

        let boosters = message.guild.roles.cache.get('847609489938448424').members.map(m=>m.user)
        
        const lb = boosters.map((v, i) => {
            return `**\`[${i + 1}]\` |** **${message.client.users.cache.get(v.id).tag}**`;
        })
        let embed = new Discord.MessageEmbed()
        .setTitle('Boosters!')
        .setThumbnail('https://emoji.gg/assets/emoji/6494-discord-boost.gif')
        .setDescription(lb.join("\n\n"))
        .setFooter('Boost now to join this list!')

        message.channel.send(embed)
    }
}
