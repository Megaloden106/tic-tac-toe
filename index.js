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

  buildPromptBoard() {
    let result = '';
    this.gameBoard.forEach((row, idx) => {
      result += `${row.join(' | ')}\n`;
      result += idx < 2
        ? '---------\n'
        : '';
    });
    return result;
  }

  nextTurn() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // stingify game state
    const promptBoard = this.buildPromptBoard();

    rl.question(`\n${promptBoard}\n${this.players[this.turns % 2]} Turn, please press an available slot from 1-9: `, (answer) => {
      // update game state
      const i = Math.floor((answer - 1) / 3);
      const j = (answer - 1) % 3;
      this.gameBoard[i][j] = this.players[this.turns];
      this.turns += 1;
      console.log(this.buildPromptBoard());
      // this.nextTurn();
      rl.close();
    });
  }
}

const app = new App();
app.nextTurn();
