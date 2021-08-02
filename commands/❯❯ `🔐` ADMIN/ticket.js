const { MessageEmbed } = require('discord.js')
const { MessageButton } = require("discord-buttons")

module.exports = {
    name : "ticket",
    description: "Opens a ticket!",
    run: async(client, message, args) => {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You do not have admin permission');
      const embed = new MessageEmbed()
    .setTitle("Open a ticket!")
    .setDescription(`:tickets: **Open a ticket to request your socials to be automatically posted by clicking the button below .**

**:tickets: Please read the message above carefully before opening a ticket.**`)
    .setColor("#9B59B6")

    const ticket = new MessageButton()
    .setStyle("blurple")
    .setLabel('📩 Open a ticket!')
    .setID("ticket")

    message.channel.send({
        buttons: [ticket],
        embed: embed
    })
    },
  };