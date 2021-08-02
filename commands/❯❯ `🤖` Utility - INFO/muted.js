const Discord = require('discord.js')

module.exports = {
    name: 'muted',
    description: "Shows the list of muted members.",
    run: (client, message, args) => {

        let muted = message.guild.roles.cache.get('832631685803016234').members.map(m=>m.user)
        
        const lb = muted.map((v, i) => {
            return `**\`[${i + 1}]\` |** **${message.client.users.cache.get(v.id).tag}**`;
        })
        let embed = new Discord.MessageEmbed()
        .setTitle('Muted Members!')
        .setThumbnail('https://emoji.gg/assets/emoji/6835_mute.png')
        .setDescription(lb.join("\n\n"))
        .setFooter(`Requested by ${message.author.tag}`)

        message.channel.send(embed)
    }
}
