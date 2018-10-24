const readline = require('readline');

class App {
  constructor() {
    this.gameBoard = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    this.turns = 0;
    this.players = ['X', 'O'];
  }

  nextTurn() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`${this.players[this.turns % 2]} Turn, please press an available slot from 1-9: `, (answer) => {
      // update game state
      console.log(`Thank you for your valuable feedback: ${answer}`);

      rl.close();
    });
  }
}

const app = new App();
app.nextTurn();