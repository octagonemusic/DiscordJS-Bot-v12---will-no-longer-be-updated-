const { MessageButton, MessageActionRow } = require("discord-buttons")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "rrinstruments",
    description: "Reaction roles for instruments.",
    usage: "<#channel>",
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setAuthor(message.guild.name)
            .setTitle("Instruments!")
            .setDescription("Pick your Instrument roles according to the instrument you play!")
            .setColor("RANDOM")
            .setImage("https://media.giphy.com/media/hI7xMa7RTQUEnwSgi8/giphy.gif")

        const piano = new MessageButton()
            .setLabel(`🎹 Piano`)
            .setStyle("blurple")
            .setID("piano")

        const guitar = new MessageButton()
            .setLabel(`🎸 Guitar`)
            .setStyle("blurple")
            .setID("guitar")

        const violin = new MessageButton()
            .setLabel("🎻 Violin")
            .setStyle("blurple")
            .setID("violin")

        const singing = new MessageButton()
        .setLabel("🎤 Singing")
        .setStyle("blurple")
        .setID("singing")

        const drums = new MessageButton()
        .setLabel("🥁 Drums")
        .setStyle("blurple")
        .setID("drums")

        const others = new MessageButton()
        .setLabel("📻 Other Instruments")
        .setStyle("blurple")
        .setID("others")


        const instruments1 = new MessageActionRow()
        .addComponent(piano)
        .addComponent(guitar)
        .addComponent(violin)
        .addComponent(singing)

        const instruments2 = new MessageActionRow()
        
        .addComponent(drums)
        .addComponent(others)

        const targetChannel = message.mentions.channels.first()

        if (message.member.permissions.has("ADMINISTRATOR")) {

            if (targetChannel) {
                targetChannel.send({
                    embed: embed,
                    components: [instruments1, instruments2],
                })
            } else {
                message.lineReply("Mention the channel you want to send the embed in.")
            }
        } else {
            message.lineReply("You need to have the \`ADMINISTRATOR\` permission to run this command.")
        }

    }

}