  
const { tictactoe } = require('reconlx')

module.exports = {
    name: 'tictactoe',
    timeout: 5,
    aliases: ['ttt', 'xox'],
    description: "Starts a match of Tic-Tac-Toe with the mentioned user.",
    usage: "<member>",
    run: async(client, message, args) => {
        const djsGames = require('djs-games')
const TicTacToe = new djsGames.TicTacToe()
 TicTacToe.startGame(message)
}
}