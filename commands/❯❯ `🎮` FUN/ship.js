const Discord = require('discord.js')

module.exports = {
	
	name: 'ship',
    description: 'Shows your affinity with the mentioned user.', 
    timeout: 5, 
    usage: "<member>",
    run: async (client, message, args) => {
   
    let user = message.mentions.users.first()
    let RN = Math.floor(Math.random() * 100) + 1

    if(!user) return message.channel.send('Please mention a user to ship.')
    

    const UnloveEmbed = new Discord.MessageEmbed() 
    .setTitle(`This isn't a match...`)
    .setThumbnail('https://cdn.discordapp.com/attachments/824906735176253450/828554687229067275/images.png')
    .setDescription(`${message.author} shipped with ${user} and it is ${RN}%`)
    .setColor("RED")

    const loveEmbed = new Discord.MessageEmbed() 
    .setTitle('They are born for each other!')
    .setThumbnail('https://cdn.discordapp.com/attachments/824906735176253450/828555115593859123/9k.png')
    .setDescription(`${message.author} shipped with ${user} and it is ${RN}%`)
    .setColor("GREEN")

    if(RN > 50) {
        message.channel.send(loveEmbed)
    } else {
        message.channel.send(UnloveEmbed)
    }


}
}