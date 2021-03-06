  
const discord = require('discord.js'); 
const moment = require("moment");

module.exports = { 

name : 'whois',
aliases: ['userinfo'],
timeout: 5,
description: "Shows information about your account or the mentioned user's account.", 
usage: "<member>",
run: async (client, message, args) => {

    

    
    let mentionedMember = message.mentions.members.first() || message.member; 

    
    var game = mentionedMember.presence.game 

    
    var status = mentionedMember.presence.status;
    if(status == 'dnd') status = "Do Not Disturb"
    if(status == 'online') status = "Online"
    if(status == 'offline') status = "Offline"
    if(status === 'idle') status = "Idle"

    
    const roles = mentionedMember.roles.cache 
    .sort((a, b) => b.position - a.position)
    .map(role => role.toString())
    .slice(0, -1);

    let displayRoles;

    if(roles.length < 25) {
        displayRoles = roles.join(' ')
        if(roles.length < 1) displayRoles = "None" 

    } else {

        
        displayRoles = roles.slice(20).join(' ')
    }

    
    const userEmbed = new discord.MessageEmbed() 
     .setAuthor(`User information of ${mentionedMember.user.username}`, mentionedMember.user.displayAvatarURL({dynamic: true, size: 2048})) 
     .addField(`**Tag: **`, `${mentionedMember.user.tag}`) 
     .addField(`**Username: **`, mentionedMember.user.username || "None")  
     .addField(`**ID: **`, `${mentionedMember.id}`) 
     .addField(`**Avatar: **`, `[Click here to view Avatar](${mentionedMember.user.displayAvatarURL({ dynamic: true})})`) 
     .addField(`**Status: **`, `${status}`) 
     .addField(`**Game: **`, `${game || 'None'}`) 
     .addField(`**Account Created At: **`, `${moment(mentionedMember.user.createdAt).format("DD-MM-YYYY [at] HH:mm")}`)
     .addField(`**Joined The Server At: **`, `${moment(mentionedMember.joinedAt).format("DD-MM-YYYY [at] HH:mm")}`) 
     .addField(`**Roles: [${roles.length}]**`, `${displayRoles}`) 
     .setColor("RANDOM")
    message.channel.send(userEmbed) 
    
}
}
