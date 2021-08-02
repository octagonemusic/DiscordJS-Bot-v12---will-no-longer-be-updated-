const config = require("../../config.json")
const prefix = config.prefix
const memberCounter = require('../../utils/member-counter')
const boostCounter = require('../../utils/boost-counter')
const mongo = require('../../utils/mongo')

module.exports = async(client) => {
    const arrayOfStatus = [
        `${prefix}help for more commands`,
        `Made by Octagone`,
        `Watch this video | https://youtu.be/fZEMdUAfqa4`
      ];
    
      let index = 0
      setInterval(() => {
        if (index === arrayOfStatus.length) index = 0
        const status = arrayOfStatus[index]
        client.user.setActivity(status);
        index++
      }, 10000)
      console.log(`${client.user.username} ✅`)
      await mongo().then(mongoose => {
        try {
          console.log('Connected to mongo!')
        } catch (err) {
          console.log(err)
        }
      })
      memberCounter(client);
      boostCounter(client);
}