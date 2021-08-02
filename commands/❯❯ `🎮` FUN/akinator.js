
const  akinator  = require("discord.js-akinator");



module.exports = { 

    name: 'akinator',
    aliases: ['aki'],
    timeout: 5,
    description: "Starts a game of Akinator", 
    run: async(client, message, args) => {
      akinator(message, client, "en")
  }
}
