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

  updateGameState(num) {
    const i = Math.floor((num - 1) / 3);
    const j = (num - 1) % 3;
    if (this.gameBoard[i][j] === parseInt(num)) {
      console.log('PLACE');
      this.gameBoard[i][j] = this.players[this.turns % 2];
      this.turns += 1;
    }
  }

  nextTurn() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const promptBoard = this.buildPromptBoard();

    rl.question(`\n${promptBoard}\n${this.players[this.turns % 2]} Turn, please press an available slot from 1-9: `, (answer) => {
      // update game state
      this.updateGameState(answer);
      rl.close();
      this.nextTurn();
    });
  }
}

const app = new App();
app.nextTurn();
