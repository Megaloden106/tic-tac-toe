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
    this.winOrDraw = false;
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
    if (num < 1 || num > 9) {
      console.error('INVALID MOVE!');
      return;
    }
    const i = Math.floor((num - 1) / 3);
    const j = (num - 1) % 3;
    if (this.gameBoard[i][j] === Number(num)) {
      this.gameBoard[i][j] = this.players[this.turns % 2];
      this.checkWinOrDrawState(i, j);
      this.turns += 1;
    }
  }

  checkRow(row) {
    const player = this.players[this.turns % 2];
    let result = true;
    this.gameBoard[row].forEach((elem) => {
      if (elem !== player) { result = false; }
    });
    return result;
  }

  checkWinOrDrawState(row, col) {
    const player = this.players[this.turns % 2];
    if (this.turns > 8) {
      console.log('\nTIE GAME\n');
      this.winOrDraw = true;
    }
    if (this.checkRow(row)
      || this.checkCol(row)
      || this.checkMajor(row)
      || this.checkCol(row)) {
      console.log(`\n${player} is the WINNER!!!\n`);
      this.winOrDraw = true;
    }
  }

  nextTurn() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const promptBoard = this.buildPromptBoard();

    rl.question(`\n${promptBoard}\n${this.players[this.turns % 2]} Turn, please press an available slot from 1-9: `, (answer) => {
      this.updateGameState(answer);
      rl.close();
      if (!this.winOrDraw) {
        this.nextTurn();
      }
    });
  }
}

const app = new App();
app.nextTurn();
