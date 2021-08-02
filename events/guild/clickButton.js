const { MessageButton } = require("discord-buttons")
const { MessageEmbed } = require("discord.js")
module.exports = async(client, button) => {
    if (button.id === 'dumbass') {
        button.reply.defer()
        const embed = new MessageEmbed()
        .setTitle("Dumbass")
        .setDescription("Now Press on the button below")
        .setColor("RED")

        const sub = new MessageButton()
        .setStyle("url")
        .setLabel("Chance to redeem yourself!")
        .setURL("https://www.youtube.com/watch?v=ID_L0aGI9bg")
      button.message.edit({button: sub, embed: embed});
    }

    if(button.id === 'smart') {
        button.reply.defer()

        const embed = new MessageEmbed()
        .setTitle("Neat")
        .setDescription("Now Press on the button below")
        .setColor("GREEN")

        const sub = new MessageButton()
        .setStyle("url")
        .setLabel("You sure bout that?")
        .setURL("https://youtube.com/octagonemusic")

        button.message.edit({button: sub, embed: embed})
    }

    if(button.id === 'F') {
      button.reply.defer()

      const msg = button.message.channel.send(`${button.clicker.user.tag} has paid respects.`).then((msg) => {
        setTimeout(() => msg.delete(), 2000);
      })

  }

    if(button.id === 'ticket') {
        button.reply.defer()

        const { guild } = button
      const channel = await button.guild.channels.create(`ticket: ${button.clicker.user.tag}`);
      
      channel.setParent("844439728669196288");
  
      channel.updateOverwrite(button.guild.id, {
        SEND_MESSAGE: false,
        VIEW_CHANNEL: false,
      });
      channel.updateOverwrite(button.clicker.user, {
        SEND_MESSAGE: true,
        VIEW_CHANNEL: true,
      });
  
      const reactionMessage = await channel.send(
          
        new MessageEmbed()
        .setAuthor(guild.name)
        .setTitle('__New Ticket!__')
        .setDescription(`🎟 **Thank you for opening a ticket! One of our staff members will be with you shortly.**\n\n🎟 **In the meanwhile, please feel free to type your request below!**`) 
        .setFooter(`Ticket opened by ${button.clicker.user.tag}`, button.clicker.user.displayAvatarURL())
        .setColor("RANDOM")
        );
  
      try {
        await reactionMessage.react("🔒");
        await reactionMessage.react("⛔");
      } catch (err) {
        channel.send("Error sending emojis!");
        throw err;
      }
  
      const collector = reactionMessage.createReactionCollector(
        (reaction, user) => button.guild.members.cache.find((member) => member.id === user.id).hasPermission("KICK_MEMBERS"),
        { dispose: true }
      );
  
      collector.on("collect", (reaction, user) => {
        switch (reaction.emoji.name) {
          case "🔒":
                      channel.send("🔒 **| This ticket has been closed!**")
            channel.updateOverwrite(button.clicker.user, { SEND_MESSAGES: false });
            break;
          case "⛔":
            channel.send("⛔ **| Deleting this channel in 5 seconds!**");
            setTimeout(() => channel.delete(), 5000);
            break;
        }
      });
  
      button.channel
        .send(`We will be right with you! ${channel}`)
        .then((msg) => {
          setTimeout(() => msg.delete(), 7000);
        })
        .catch((err) => {
          throw err;
        });
    }

    if(button.id === "male") {
       
      
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'male')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "female") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'female')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "transgender") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'non-binary')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "asia") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'asia')
     
      if(!role) return button.reply.send("This role is not found")

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "europe") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'europe')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "NA") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'north america')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "SA") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'south america')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "africa") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'africa')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "oceania") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'oceania')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "music") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'music')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "reading") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'reading')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "art") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'art')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "gaming") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'gaming')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "piano") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'piano')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "guitar") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'guitar')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }


    if(button.id === "violin") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'violin')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "drums") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'drums')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "singing") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'singing')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "others") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'other instruments')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "below18") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'below 18')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "above18") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'above 18')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "livestreamping") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'live stream ping')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "deadchatping") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'dead chat ping')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

    if(button.id === "movienightping") {
       
      const role = button.guild.roles.cache.find(role => role.name.toLowerCase() === 'movie night ping')
     

      if(button.clicker.member.roles.cache.has(role.id)){
        await button.message.guild.members.cache.get(button.clicker.user.id).roles.remove(role)

        button.reply.send(`The ${role.name} role has been successfully removed!`, true)

      } else {

        await button.message.guild.members.cache.get(button.clicker.user.id).roles.add(role)

        button.reply.send(`The ${role.name} role has been successfully added!`, true)
      }
    }

}