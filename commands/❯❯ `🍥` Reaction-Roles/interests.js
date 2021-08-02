const { MessageButton, MessageActionRow } = require("discord-buttons")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "rrinterests",
    description: "Reaction roles for interests.",
    usage: "<#channel>",
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setAuthor(message.guild.name)
            .setTitle("Interests!")
            .setDescription("Pick your Interest roles for interests!")
            .setColor("RANDOM")
            .setImage("https://media.giphy.com/media/Okzo9lDDlNZsJdTH04/giphy.gif")

        const music = new MessageButton()
            .setLabel(`🎶 Music`)
            .setStyle("blurple")
            .setID("music")

        const reading = new MessageButton()
            .setLabel(`📕 Reading`)
            .setStyle("blurple")
            .setID("reading")

        const art = new MessageButton()
            .setLabel("🎨 Art")
            .setStyle("blurple")
            .setID("art")

        const gaming = new MessageButton()
        .setLabel("🎮 Gaming")
        .setStyle("blurple")
        .setID("gaming")


        const interests = new MessageActionRow()
        .addComponent(music)
        .addComponent(reading)
        .addComponent(art)
        .addComponent(gaming)

        const targetChannel = message.mentions.channels.first()

        if (message.member.permissions.has("ADMINISTRATOR")) {

            if (targetChannel) {
                targetChannel.send({
                    embed: embed,
                    components: [interests],
                })
            } else {
                message.lineReply("Mention the channel you want to send the embed in.")
            }
        } else {
            message.lineReply("You need to have the \`ADMINISTRATOR\` permission to run this command.")
        }

    }

}