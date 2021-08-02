const { MessageButton, MessageActionRow } = require("discord-buttons")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "rrregions",
    description: "Reaction roles for region.",
    usage: "<#channel>",
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setAuthor(message.guild.name)
            .setTitle("Region!")
            .setDescription("Pick your Region roles according to the region you're from!")
            .setColor("RANDOM")
            .setImage("https://media.giphy.com/media/74bHMD7bFCjHw5e1Oz/giphy.gif")

        const asia = new MessageButton()
            .setLabel(`🍜 Asia`)
            .setStyle("blurple")
            .setID("asia")

        const europe = new MessageButton()
            .setLabel(`🍕 Europe`)
            .setStyle("blurple")
            .setID("europe")

        const northamerica = new MessageButton()
            .setLabel("🍔 North America")
            .setStyle("blurple")
            .setID("NA")

        const southamerica = new MessageButton()
        .setLabel("🌮 South America")
        .setStyle("blurple")
        .setID("SA")

        const africa = new MessageButton()
        .setLabel("🍖 Africa")
        .setStyle("blurple")
        .setID("africa")

        const oceania = new MessageButton()
        .setLabel("🦘 Oceania")
        .setStyle("blurple")
        .setID("oceania")


        const region1 = new MessageActionRow()
        .addComponent(asia)
        .addComponent(europe)
        .addComponent(northamerica)
        .addComponent(southamerica)

        const region2 = new MessageActionRow()
        
        .addComponent(africa)
        .addComponent(oceania)

        const targetChannel = message.mentions.channels.first()

        if (message.member.permissions.has("ADMINISTRATOR")) {

            if (targetChannel) {
                targetChannel.send({
                    embed: embed,
                    components: [region1, region2],
                })
            } else {
                message.lineReply("Mention the channel you want to send the embed in.")
            }
        } else {
            message.lineReply("You need to have the \`ADMINISTRATOR\` permission to run this command.")
        }

    }

}