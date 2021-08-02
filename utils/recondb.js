const { reconDB } = require('reconlx')
const client = require("../index")
const { mongoPath } = require('../config.json')

const db = new reconDB(client, {
    uri: mongoPath,
})

module.exports = db