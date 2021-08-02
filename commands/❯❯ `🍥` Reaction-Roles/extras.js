const { MessageButton } = require("discord-buttons")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "rrextras",
    description: "Reaction roles for gender.",
    usage: "<#channel>",
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setAuthor(message.guild.name)
            .setTitle("Extras!")
            .setDescription("Pick your Ping roles and other roles here!")
            .setColor("RANDOM")
            .setImage("https://media.giphy.com/media/AJNX1SVVs57tTvs3RS/giphy.gif")

        const livestreamping = new MessageButton()
            .setLabel(`🔴 Live-Stream Ping`)
            .setStyle("blurple")
            .setID("livestreamping")

        const deadchatping = new MessageButton()
            .setLabel(`💀 Dead-Chat Ping`)
            .setStyle("blurple")
            .setID("deadchatping")

        const movienightping = new MessageButton()
            .setLabel("🎥 Movie-Night Ping")
            .setStyle("blurple")
            .setID("movienightping")

        const targetChannel = message.mentions.channels.first()

        if (message.member.permissions.has("ADMINISTRATOR")) {

            if (targetChannel) {
                targetChannel.send({
                    embed: embed,
                    buttons: [livestreamping, deadchatping, movienightping]
                })
            } else {
                message.lineReply("Mention the channel you want to send the embed in.")
            }
        } else {
            message.lineReply("You need to have the \`ADMINISTRATOR\` permission to run this command.")
        }

    }

}