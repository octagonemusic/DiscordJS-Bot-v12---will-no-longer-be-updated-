const { MessageEmbed } = require("discord.js")

module.exports = (client, message) => {
    let esnipes = client.esnipes.get(message.channel.id) || []
  if (esnipes.length > 5) esnipes = esnipes.slice(0, 4)

  esnipes.unshift({
    msg: message,
    image:  message.attachments.first() ? message.attachments.first().proxyURL : null,
    time: Date.now()
  })

  client.esnipes.set(message.channel.id, esnipes)

  let content = message.content
    if(!content) content = "_ _"

    const embed = new MessageEmbed()
    .setAuthor(message.member.user.tag, message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`Message updated in <#${message.channel.id}>`)
    .addFields({
      name: `Pre-edited message`,
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