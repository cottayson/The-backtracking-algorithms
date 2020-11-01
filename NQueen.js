class NQueen {
  constructor (size) {
    this.board = new Array(size).fill('.').map(() => new Array(size).fill('.'))
    this.size = size
  }

  isValid ([row, col]) {
    // function to check if the placement of the queen in the given location is valid
    
    if (this.board[row][col] === 'E') {
      // this cell must be empty -> the placement in that location is not valid
      return false
    }
    
    if (!columnsAlwaysFillsFromLeftToRight) {
      // checking the whole row
      for (let i = 0; i < this.size; i++) {
        if (this.board[row][i] === 'Q') return false
      }
      
      // checking the UPPER RIGHT diagonal
      for (let i = row, j = col; i >= 0 && j < this.size; i--, j++) {
        if (this.board[i][j] === 'Q') return false
      }

      // checking the LOWER RIGHT diagonal
      for (let i = row, j = col; j < this.size && i < this.size; i++, j++) {
        if (this.board[i][j] === 'Q') return false
      }
    } else {
      // checking the left of the current row
      for (let i = 0; i < col; i++) {
        if (this.board[row][i] === 'Q') return false
      }
    }

    // checking the UPPER LEFT diagonal
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (this.board[i][j] === 'Q') return false
    }

    // checking the LOWER LEFT diagonal
    for (let i = row, j = col; j >= 0 && i < this.size; i++, j--) {
      if (this.board[i][j] === 'Q') return false
    }

    return true
  }
  
  isEmptyColumn(col) {
    for (let i = 0; i < this.size; i++) {
      if (this.board[i][col] === 'Q') return false
    }
    return true
  }
  
  isAllQueensValid() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j] === 'Q') {
          this.board[i][j] = '.'
          const valid = this.isValid([i, j]);
          this.board[i][j] = 'Q';
          if (!valid) {
            return false;
          }
        }
      }
    }
    return true;
  }

  solve (col = 0, preCheck = false) {
    // function to solve the board
    
    if (preCheck) {
      if (!this.isAllQueensValid()) {
        return false
      }
    }
    if (col >= this.size) { return true }
    
    if (!this.isEmptyColumn(col)) {
      return this.solve(col + 1);
    }
    
    for (let i = 0; i < this.size; i++) {
      if (this.isValid([i, col])) {
        this.board[i][col] = 'Q'
        if (debug) {
          console.log(`col = ${col}`)
          this.printBoard()
          console.log('\n')
        }

        if (this.solve(col + 1)) { 
          return true
        } else {
          // backtracking
          this.board[i][col] = '.'
        }
      }
    }

    return false
  }

  printBoard () {
    // utility function to display the board
    for (const row of this.board) {
      console.log(...row)
    }
  }
}

const debug = true
const columnsAlwaysFillsFromLeftToRight = false
const findAllSolutions = false // NOT IMPLEMENTED
// 'Q' means on this cell one can put the Queen
// 'E' means this cell must be empty

function main () {
  // maximum calculated size = NQueen(29)
  const board = new NQueen(8)
  board.board = [
    ['E', 'E', '.', '.', '.', '.', '.', '.'],
    ['E', 'E', '.', '.', '.', '.', '.', '.'],
    ['E', 'E', '.', '.', '.', '.', '.', '.'],
    ['E', 'E', '.', '.', '.', '.', '.', '.'],
    ['E', 'E', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
  ]

  board.printBoard()
  console.log('\n')

  if (!board.solve(0, true)) {
    console.log('no solution.')
  }

  board.printBoard()
}

main()