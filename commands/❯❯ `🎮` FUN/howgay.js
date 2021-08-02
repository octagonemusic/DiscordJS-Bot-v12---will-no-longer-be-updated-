const Discord = require('discord.js')

module.exports = {
    name: "howgay",
    aliases: ["gayrate"],
    description: "Shows how gay you are",
    usage: "<member>",

    run: async (client, message, args) => {
        let member = message.mentions.users.first() || message.author

        let rng = Math.floor(Math.random() * 101);

        const howgayembed = new Discord.MessageEmbed()
        .setTitle(`Gay Machine Calculator`)
        .setDescription(`${member.username} is ` + rng + "% Gay🌈")
        .setColor("GREEN")

        message.channel.send(howgayembed);
    }
}