const { Collection, MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const prefix = config.prefix
const Timeout = new Collection()
const words = require('../../curse.json');
const db = require('../../utils/recondb');
const ms = require('ms')
const { Database } = require('quickmongo')
const { mongoPath } = require('../../config.json')
const mongoDBURL = mongoPath
const quickmongo = new Database(mongoDBURL)
const Levels = require('discord-xp');
Levels.setURL(mongoPath)

module.exports = async (client, message) => {
  const { guild, member } = message
  if (message.mentions.users.first()) {
    if (message.mentions.users.first().id === "854931296453918720") return message.channel.send(`My prefix in this server is \`${prefix}\``)
  }

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
      if (command.timeout) {
        if (Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` cooldown.`)
        command.run(client, message, args)
        Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
        setTimeout(() => {
          Timeout.delete(`${command.name}${message.author.id}`)
        }, command.timeout)
      } else {
        command.run(client, message, args)
      }
    }
  } 

  

    const onoffSchema = require('../../schemas/onoff-schema')
    onoffSchema.findOne({ guildId: guild.id, userId: member.id }, async (err, data) => {
      if (data) {
        const off = data.off === 1
        if (off) {
          message.delete()
        } else {
          return
        }
      } else {
        return
      }
    })

    const autowarnSchema = require('../../schemas/autowarn-schema')
    if (await db.has(`swear-${message.guild.id}`) === false) return;

    for (let i = 0; i < words.length; i++) {
      if (message.content.toLowerCase().includes(words[i])) {

        message.delete();

        const params = {
          guildId: guild.id,
          userId: member.id
        }
        autowarnSchema.findOne(params, async (err, data) => {
          if (data) {
            data.warns++

            console.log(data)
            await autowarnSchema.findOneAndUpdate(params, data)
          } else {
            new autowarnSchema({
              guildId: guild.id,
              userId: member.id,
              warns: 1,
            }).save()
          }
          message.channel.send('That word is not allowed in the server!')
            .then(m => m.delete({ timeout: 3000 }))

          let role = message.guild.roles.cache.find(r => r.name === "Muted");
          const Schema = require('../../schemas/mute-schema')
          if (data.warns === 4) {
            if (!member.hasPermission("KICK_MEMBERS")) {
              member.roles.add(role)
              await Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
                if (!data) {
                  new Schema({
                    Guild: message.guild.id,
                    Users: message.member.id,
                  }).save()
                } else {
                  data.Users.push(message.member.id)
                  data.save()
                }
              })
              message.channel.send(new MessageEmbed()
                .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
                .setTitle('🔇 __Muted!__')
                .setDescription(`** ${message.author} has been muted for spamming bad words.**`)
                .setColor('RANDOM')
                .setTimestamp())
              member.send(new MessageEmbed()
                .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
                .setTitle('🔇 __Muted!__')
                .setDescription(`** You have been muted for spamming bad words.**`)
                .setColor('RANDOM')
                .setTimestamp())
              guild.channels.cache.get('832524541883580426').send(new MessageEmbed()
                .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
                .setTitle('🔇 __Muted!__')
                .setDescription(`** ${message.author} has been muted for spamming bad words.**`)
                .setColor('RANDOM')
                .setTimestamp())
              setTimeout(async function () {
                member.roles.remove(role)
                member.send(`You have now been unmuted in ${message.guild.name}.`)
                guild.channels.cache.get('832524541883580426').send(`${member.user.tag} has been now unmuted, muted earlier for spamming bad words.`)
                await Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
                  const user = data.Users.findIndex((prop) => prop === member.id)
                  data.Users.splice(user, 1)
                  data.save()
                })
              }, ms('5h'));
            } else {
              return console.log('that mf is an admin/mod')
            }
          }

          if (data.warns === 8) {

            if (!member.hasPermission("KICK_MEMBERS")) {
              member.roles.add(role)
              await Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
                if (!data) {
                  new Schema({
                    Guild: message.guild.id,
                    Users: message.member.id,
                  }).save()
                } else {
                  data.Users.push(message.member.id)
                  data.save()
                }
              })
              message.channel.send(new MessageEmbed()
                .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
                .setTitle('🔇 __Muted!__')
                .setDescription(`**👍 *${message.author}* has been muted for spamming bad words.**`)
                .setColor('RANDOM')
                .setTimestamp())
              member.send(new MessageEmbed()
                .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
                .setTitle('🔇 __Muted!__')
                .setDescription(`** You have been muted for spamming bad words.**`)
                .setColor('RANDOM')
                .setTimestamp())
              guild.channels.cache.get('832524541883580426').send(new MessageEmbed()
                .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
                .setTitle('🔇 __Muted!__')
                .setDescription(`** ${message.author} has been muted for spamming bad words.**`)
                .setColor('RANDOM')
                .setTimestamp())
              setTimeout(async function () {
                member.roles.remove(role)
                member.send(`You have now been unmuted in ${message.guild.name}.`)
                guild.channels.cache.get('832524541883580426').send(`${member.user.tag} has been now unmuted, muted earlier for spamming bad words.`)

                await Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
                  const user = data.Users.findIndex((prop) => prop === member.id)
                  data.Users.splice(user, 1)
                  data.save()
                })
              }, ms('15h'));
            } else {
              return console.log('that mf is an admin/mod.')
            }
          }

          if (data.warns === 12) {
            if (!member.hasPermission("KICK_MEMBERS")) {
              message.channel.send(new MessageEmbed()
                .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
                .setTitle('🦶 __Kicked!__')
                .setDescription(`**👍 *${message.author}* has been kicked for spamming bad words.**`)
                .setColor('RANDOM')
                .setTimestamp())
              member.kick(["Spamming bad words"])
            } else {
              return
            }
          }
          if (data.warns === 15) {
            if (!member.hasPermission("KICK_MEMBERS")) {
              message.channel.send(new MessageEmbed()
                .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
                .setTitle('🦶 __Banned!__')
                .setDescription(`**👍 *${message.author}* has been banned for spamming bad words.**`)
                .setColor('RANDOM')
                .setTimestamp())
              member.ban(["Spamming bad words"])
            } else {
              return
            }
          }
        })

      }
    }

    if (await quickmongo.fetch(`afk-${message.author.id}+${message.guild.id}`)) {
      const info = await quickmongo.get(`afk-${message.author.id}+${message.guild.id}`)
      const user = message.member
      const oldNickname = await quickmongo.get(`afk-${message.author.id}`)
      await quickmongo.delete(`afk-${message.author.id}+${message.guild.id}`)
      await quickmongo.delete(`afk-${message.author.id}`)

      try {
        await user.setNickname(oldNickname)
      } catch {
        console.log('👎 | Cannot reset nickname.')
      }

      const embed = new MessageEmbed()
        .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
        .setTitle("💤 __AFK!__")
        .setDescription(`
**Your AFK has been removed successfully!**

**__Reason__:** \`${info}\``)
        .setColor('RANDOM')
        .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
        .setTimestamp()
      message.channel.send(embed)
    }

    const reason = require('../../commands/❯❯ `🤖` Utility - INFO/afk')
    const mentionedMember = message.mentions.members.first()
    if (mentionedMember) {
      if (await quickmongo.fetch(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
        const embed = new MessageEmbed()
          .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
          .setTitle("💤 __AFK!__")
          .setDescription(`
**${mentionedMember.user.tag} is AFK
    
__Reason__:** ` + (await quickmongo.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`))
          )
          .setColor('RANDOM')
        message.channel.send(embed)
          ;
      } else return;
    }
    if (['832479757781827624', '832975056442228797', '832515573991866410', '832520603872657408', '832520734458642482', '832520693559722003', '832523883500273684', '832521864513060904', '832991484268773396'].includes(message.channel.id)) {
      return;
    } else {
      const randomAmountOfXp = 5 // Min 1, Max 30
      const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
      if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**!`);
      }
      const lvl = await Levels.fetch(message.author.id, message.guild.id)
      const Member = message.member
      if (lvl.xp === 2500) {
        Member.roles.add(message.guild.roles.cache.find(r => r.id === '832501629990600725'))
        const ionianembed = new MessageEmbed()
          .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
          .setTitle('Congratulations!')
          .setDescription(`You have earned the \`Ionian\` role! Chat more to earn more roles and permissions!`)
          .setFooter(`Role reward unlocked by ${message.author.username}`, message.author.displayAvatarURL())
          .setImage(`https://media.giphy.com/media/hI7xMa7RTQUEnwSgi8/giphy.gif`)
          .setColor('RANDOM')
        message.channel.send(ionianembed)
      }
      if (lvl.xp === 10000) {
        Member.roles.add(message.guild.roles.cache.find(r => r.id === '832501798324535306'))
        const dorianembed = new Discord.MessageEmbed()
          .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
          .setTitle('Congratulations!')
          .setDescription(`You have earned the \`Dorian\` role! Chat more to earn more roles and permissions!`)
          .setFooter(`Role reward unlocked by ${message.author.username}`, message.author.displayAvatarURL())
          .setImage(`https://media.giphy.com/media/hI7xMa7RTQUEnwSgi8/giphy.gif`)
          .setColor('RANDOM')
        message.channel.send(dorianembed)
      }
      if (lvl.xp === 28900) {
        Member.roles.add(message.guild.roles.cache.find(r => r.id === '832501766650069023'))
        const phrygianembed = new Discord.MessageEmbed()
          .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
          .setTitle('Congratulations!')
          .setDescription(`You have earned the \`Phrygian\` role! Chat more to earn more roles and permissions!`)
          .setFooter(`Role reward unlocked by ${message.author.username}`, message.author.displayAvatarURL())
          .setImage(`https://media.giphy.com/media/hI7xMa7RTQUEnwSgi8/giphy.gif`)
          .setColor('RANDOM')
        message.channel.send(phrygianembed)
      }
      if (lvl.xp === 48400) {
        Member.roles.add(message.guild.roles.cache.find(r => r.id === '832501737587474482'))
        const lydianembed = new Discord.MessageEmbed()
          .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
          .setTitle('Congratulations!')
          .setDescription(`You have earned the \`Lydian\` role! Chat more to earn more roles and permissions!`)
          .setFooter(`Role reward unlocked by ${message.author.username}`, message.author.displayAvatarURL())
          .setImage(`https://media.giphy.com/media/hI7xMa7RTQUEnwSgi8/giphy.gif`)
          .setColor('RANDOM')
        message.channel.send(lydianembed)
      }
      if (lvl.xp === 90000) {
        Member.roles.add(message.guild.roles.cache.find(r => r.id === '832501733603278889'))
        const mixolydianembed = new Discord.MessageEmbed()
          .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
          .setTitle('Congratulations!')
          .setDescription(`You have earned the \`Mixolydian\` role! Chat more to earn more roles and permissions!`)
          .setFooter(`Role reward unlocked by ${message.author.username}`, message.author.displayAvatarURL())
          .setImage(`https://media.giphy.com/media/hI7xMa7RTQUEnwSgi8/giphy.gif`)
          .setColor('RANDOM')
        message.channel.send(mixolydianembed)
      }
      if (lvl.xp === 122500) {
        Member.roles.add(message.guild.roles.cache.find(r => r.id === '832501731430498304'))
        const aeolianembed = new Discord.MessageEmbed()
          .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
          .setTitle('Congratulations!')
          .setDescription(`You have earned the \`Aeolian\` role! Chat more to earn more roles and permissions!`)
          .setFooter(`Role reward unlocked by ${message.author.username}`, message.author.displayAvatarURL())
          .setImage(`https://media.giphy.com/media/hI7xMa7RTQUEnwSgi8/giphy.gif`)
          .setColor('RANDOM')
        message.channel.send(aeolianembed)
      }
      if (lvl.xp === 193600) {
        Member.roles.add(message.guild.roles.cache.find(r => r.id === '832501728817446932'))
        const locrianembed = new Discord.MessageEmbed()
          .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
          .setTitle('Congratulations!')
          .setDescription(`You have earned the \`Locrian\` role! Chat more to earn more roles and permissions!`)
          .setFooter(`Role reward unlocked by ${message.author.username}`, message.author.displayAvatarURL())
          .setImage(`https://media.giphy.com/media/hI7xMa7RTQUEnwSgi8/giphy.gif`)
          .setColor('RANDOM')
        message.channel.send(locrianembed)
      }
    }
  
    

}
