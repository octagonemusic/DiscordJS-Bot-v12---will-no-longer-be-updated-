const { MessageEmbed } = require('discord.js')
const onoffSchema = require('../../schemas/onoff-schema')

module.exports = {
    name: "on",
    description: "Turns on the user.",
    run: async(client, message, args) => {
        const role = message.guild.roles.cache.get('857686987749588992')
        const { guild, member } = message
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have permission to on/off members.")
        const target = message.mentions.members.first()
        if(!target) return message.channel.send('Please mention a user to turn on.')
        if(target.hasPermission("KICK_MEMBERS")) return message.channel.send(
            new MessageEmbed()
            .setAuthor(guild.name)
            .setTitle('__⛔ Error!__')
            .setDescription('You cannot on/off Admins/Moderators.')
            .setTimestamp()
        )

        const params = {
            guildId: guild.id,
            userId: target.user.id
        } 
        onoffSchema.findOne(params, async(err, data) => {
            if(data) {
                const hasOff = data.off === 1
                if(!hasOff) {
                    message.reply(`That user is not turned off!`)
                } else {
                    data.off = 0
                    target.roles.remove(role)
                    message.reply(`That user has been turned on!`)
                }
                console.log(data)
                await onoffSchema.findOneAndUpdate(params, data)
            } else if(!data){
                    message.reply(`That user is not turned off!`)
            }
            
            
        })
        


    }
}