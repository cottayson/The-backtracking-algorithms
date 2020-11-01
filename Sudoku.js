class Sudoku {
  // Sudoku Class to hold the board and related functions
  constructor (board) {
    this.board = board
  }

  findEmptyCell () {
    // Find a empty cell in the board (returns [-1, -1] if all cells are filled)
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.board[i][j] === 0) return [i, j]
      }
    }
    return [-1, -1]
  }

  check ([y, x], value) {
    // checks if the value to be added in the board is an acceptable value for the cell

    // checking through the row
    for (let i = 0; i < 9; i++) {
      if (this.board[i][x] === value) return false
    }
    // checking through the column
    for (let i = 0; i < 9; i++) {
      if (this.board[y][i] === value) return false
    }

    // checking through the 3x3 block of the cell
    const secRow = Math.floor(y / 3)
    const secCol = Math.floor(x / 3)
    for (let i = (secRow * 3); i < ((secRow * 3) + 3); i++) {
      for (let j = (secCol * 3); j < ((secCol * 3) + 3); j++) {
        if (y !== i && x !== j && this.board[i][j] === value) return false
      }
    }

    return true
  }

  solve () {
    const [y, x] = this.findEmptyCell()

    // checking if the board is complete
    if (y === -1 && x === -1) return true

    for (let val = 1; val < 10; val++) {
      if (this.check([y, x], val)) {
        this.board[y][x] = val
        if (this.solve()) return true
        // backtracking if the board cannot be solved using current configuration
        this.board[y][x] = 0
      }
    }
    // returning false the board cannot be solved using current configuration
    return false
  }

  getSection (row, [start, end]) {
    return this.board[row].slice(start, end)
  }

  printBoard () {
    // helper function to display board
    for (let i = 0; i < 9; i++) {
      if (i % 3 === 0 && i !== 0) console.log('- - - - - - - - - - - - - - -')
      console.log(
        ...this.getSection(i, [0, 3]), ' | ',
        ...this.getSection(i, [3, 6]), ' | ',
        ...this.getSection(i, [6, 9]))
    }
  }
}

function readFromString(str) {
  let cells = [];
  for (let i = 0; i < str.length; i++) {
    let ch = str.charAt(i);
    if (ch === '_' || ch === '0') { cells.push(0)          }
    if ('123456789'.includes(ch)) { cells.push(Number(ch)) }
  }
  let board = [];
  if (cells.length !== 81) {
    throw new Error(`amount of sudoku cells = ${row.length} != 81`);
  }
  for (let i = 0; i < 9; i++) {
    board.push([]);
    for (let j = 0; j < 9; j++) {
      board[i].push(cells[9*i + j])
    }
  }
  return board;
}


function main () {
  // main function with an example
  
  // World's hardest sudoku by Arto Inkala, a Finnish mathematician
  // https://www.telegraph.co.uk/news/science/science-news/9359579/Worlds-hardest-sudoku-can-you-crack-it.html
  let puzzle = readFromString(
  `8|_|_||_|_|_||_|_|_
   _|_|3||6|_|_||_|_|_
   _|7|_||_|9|_||2|_|_

   _|5|_||_|_|7||_|_|_
   _|_|_||_|4|5||7|_|_
   _|_|_||1|_|_||_|3|_

   _|_|1||_|_|_||_|6|8
   _|_|8||5|_|_||_|1|_
   _|9|_||_|_|_||4|_|_`)
  
  const sudokuBoard = new Sudoku(puzzle)

  sudokuBoard.printBoard()

  console.log('\n')
  if(!sudokuBoard.solve()) {
    console.log('no solution.')
  }

  sudokuBoard.printBoard()
}

main()