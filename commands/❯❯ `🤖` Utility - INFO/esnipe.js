const { MessageEmbed }  = require('discord.js')
const moment = require('moment')

module.exports = {
    name: 'editsnipe',
    aliases: ['esnipe'],
    description: "Shows the recently edited messages.",
    usage: '<number>',
    timeout: 5,
    run: (client, message, args) => {
        const esnipes = client.esnipes.get(message.channel.id)
        if(!esnipes) return message.reply("There is nothing to snipe!")

        const esnipe = +args[0] - 1 || 0
        const target = esnipes[esnipe]
        if(!target) return message.channel.reply(`**There are only \`${esnipes.length}\` messages!**`);

        const { msg, image, time } = target
        message.channel.send(
            new MessageEmbed()
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
            .setDescription(msg.content)
            .setImage(image)
            .setColor("RANDOM")
            .setFooter(`${moment(time).fromNow()} | ${esnipe + 1} / ${esnipes.length}`)
        );
    }
}