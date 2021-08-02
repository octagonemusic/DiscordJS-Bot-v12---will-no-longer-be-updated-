const { MessageEmbed } = require("discord.js")

module.exports = (client, message) => {
    let snipes = client.snipes.get(message.channel.id) || []
    if (snipes.length > 5) snipes = snipes.slice(0, 4)
  
    snipes.unshift({
      msg: message,
      image: message.attachments.first() ? message.attachments.first().proxyURL : null,
      time: Date.now()
    })
  
    client.snipes.set(message.channel.id, snipes)

    
    let content = message.content
    if(!content) content = "_ _"

    const embed = new MessageEmbed()
    .setAuthor(message.member.user.tag, message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`Message deleted in <#${message.channel.id}>`)
    .addFields({
      name: `Content`,
      value: content
    },
    
    {
      name: `ID`,
      value: `\`UserID: ${message.author.id}\nMessageID: ${message.id}\``
    })
    .setImage(message.attachments.first() ? message.attachments.first().proxyURL : null)
    .setColor("RED")
    .setTimestamp()

    client.channels.cache.get("832524518332825620").send(embed)
}