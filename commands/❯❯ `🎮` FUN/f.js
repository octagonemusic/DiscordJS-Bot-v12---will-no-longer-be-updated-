const Discord = require('discord.js')
const { MessageButton } = require('discord-buttons')

module.exports = {
  name: 'f',
  description: "A simple command used to pay respects.",
  timeout: 5,
  usage: "<reason>",
  run: async(client, message, args) =>{
        const prefix = '['
        const reason = message.content.slice(prefix.length).trim().split(/ +/g)

        const embed = new Discord.MessageEmbed()
          .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
          .setTitle(":regional_indicator_f: __Pay Respects!__")
          .setDescription(`
    **Press :regional_indicator_f: to pay respects to:
    
*${[[...reason].splice(1).join(' ')]}***`)
          .setColor('RANDOM')
          .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
          .setTimestamp()

          const yes = new MessageButton()
    .setStyle("blurple")
    .setLabel('F')
    .setID("F")
    message.channel.send({
      buttons: [yes],
      embed: embed
  })
    }
}