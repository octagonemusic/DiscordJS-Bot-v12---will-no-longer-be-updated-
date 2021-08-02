const { MessageEmbed, Collection } = require('discord.js')
const onoffSchema = require('../../schemas/onoff-schema')

module.exports = {
    name: "offed",
    description: "Shows the list of offed users.",
    run: async(client, message, args) => {
        
        let boosters = message.guild.roles.cache.get('857686987749588992').members.map(m=>m.user)
        
        const lb = boosters.map((v, i) => {
            return `**\`[${i + 1}]\` |** **${message.client.users.cache.get(v.id).tag}**`;
        })
        let embed = new MessageEmbed()
        .setTitle('Offed Members!')
        .setThumbnail('https://emoji.gg/assets/emoji/9437-anime-shut-up.png')
        .setDescription(lb.join("\n\n"))

        message.channel.send(embed)

        

    }
}