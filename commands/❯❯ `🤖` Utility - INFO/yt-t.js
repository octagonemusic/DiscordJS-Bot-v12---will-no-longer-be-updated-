const discord = require('discord.js')
const fetch = require('node-fetch')
const { MessageButton } = require('discord-buttons')


module.exports = {

    name: "yt-together",
    aliases: ["yt-t", "yttogether", "ytt"],
    description: "Use this command to watch youtube together with friends!",
    
    run: async (client, message, args) => {
        const { guild } = message

    let channel = message.member.voice.channel;
    if(!channel) return message.channel.send("You have to be in a vc")

    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: "755600276941176913",
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${client.token}`,
            "Content-Type": "application/json"
        }
    })
    
    .then(res => res.json())
    .then(invite => {
        if(!invite.code) return message.channel.send("Sadly i can't start a yt together")
        const e = new discord.MessageEmbed()
        .setAuthor(guild.name)
        .setTitle(`__YouTube Together__!`)
        .setDescription(`**Click the button below to watch YouTube Together!**`)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()
        .setColor('RED')
        const ytt = new MessageButton()
        .setStyle("url")
        .setLabel('Click to watch together!')
        .setURL(`https://discord.com/invite/${invite.code}`)
        message.channel.send({
          buttons: [ytt],
          embed: e
      })
    })
}
}