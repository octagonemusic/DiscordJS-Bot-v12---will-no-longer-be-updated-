const { MessageButton } = require("discord-buttons")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "rrage",
    description: "Reaction roles for age.",
    usage: "<#channel>",
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setAuthor(message.guild.name)
            .setTitle("Age!")
            .setDescription("Pick your age roles according to your age!")
            .setColor("RANDOM")
            .setImage("https://media.giphy.com/media/gf7QmHvHMiyWYv6Ck6/giphy.gif")

        const below18 = new MessageButton()
            .setLabel(`👦 Below 18`)
            .setStyle("blurple")
            .setID("below18")

        const above18 = new MessageButton()
            .setLabel(`👨 Above 18`)
            .setStyle("blurple")
            .setID("above18")

        const targetChannel = message.mentions.channels.first()

        if (message.member.permissions.has("ADMINISTRATOR")) {

            if (targetChannel) {
                targetChannel.send({
                    embed: embed,
                    buttons: [below18, above18]
                })
            } else {
                message.lineReply("Mention the channel you want to send the embed in.")
            }
        } else {
            message.lineReply("You need to have the \`ADMINISTRATOR\` permission to run this command.")
        }

    }

}