const { MessageButton } = require("discord-buttons")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "rrgender",
    description: "Reaction roles for gender.",
    usage: "<#channel>",
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setAuthor(message.guild.name)
            .setTitle("Gender!")
            .setDescription("Pick your Gender roles according to your gender!")
            .setColor("RANDOM")
            .setImage("https://media.giphy.com/media/1JoWtbvUQyQYnJ6fXH/giphy.gif")

        const male = new MessageButton()
            .setLabel(`🚹 Male`)
            .setStyle("blurple")
            .setID("male")

        const female = new MessageButton()
            .setLabel(`🚺 Female`)
            .setStyle("blurple")
            .setID("female")

        const transgender = new MessageButton()
            .setLabel("🏳‍🌈 Non-Binary")
            .setStyle("blurple")
            .setID("transgender")

        const targetChannel = message.mentions.channels.first()

        if (message.member.permissions.has("ADMINISTRATOR")) {

            if (targetChannel) {
                targetChannel.send({
                    embed: embed,
                    buttons: [male, female, transgender]
                })
            } else {
                message.lineReply("Mention the channel you want to send the embed in.")
            }
        } else {
            message.lineReply("You need to have the \`ADMINISTRATOR\` permission to run this command.")
        }

    }

}