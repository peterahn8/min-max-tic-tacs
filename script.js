(function () {
  const gameBoard = (() => {
    let field = ['', '', '', '', '', '', '', '', ''];

    const setField = (index, val) => {
      field[index] = val;
    };

    const resetField = () => {
      field = ['', '', '', '', '', '', '', '', ''];
    };

    const getField = (index) => {
      return field[index];
    };

    return { field, setField, resetField, getField };
  })();

  const Player = (sign) => {
    this.sign = sign;

    const getSign = () => {
      return sign;
    };

    return { getSign };
  };

  const gameController = (() => {
    const playerX = Player('X');
    const playerO = Player('O');
    let turn = 1;
    let gameOver = false;

    const playRound = (index) => {
      gameBoard.setField(index, getCurrPlayerSign());
      console.log(`${getCurrPlayerSign()} made a move`);
      checkForTie();
      checkForWinner();
      turn++;
    };

    const getCurrPlayerSign = () => {
      if (turn % 2 === 0) {
        return playerO.getSign();
      } else {
        return playerX.getSign();
      }
    };

    const checkForWinner = () => {
      const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let c = 0; c < winConditions.length; c++) {
        if (gameOver) {
          return;
        }
        if (winConditions[c].every((val) => gameBoard.getField(val) === 'X')) {
          console.log('X has won');
          gameOver = true;
        } else if (
          winConditions[c].every((val) => gameBoard.getField(val) === 'O')
        ) {
          console.log('O has won');
          gameOver = true;
        }
      }
    };

    const checkForTie = () => {
      if (gameBoard.field.every((val) => val !== '')) {
        gameOver = true;
        console.log('tie')
      } 
    }

    return { playRound };
  })();

  const displayController = (() => {
    const _square = document.querySelectorAll('.square');

    _square.forEach((square) =>
      square.addEventListener('click', () => {
        if (square.textContent !== '') return;
        gameController.playRound(square.id);
        updateGameBoard();
      })
    );

    const updateGameBoard = () => {
      for (let i = 0; i < _square.length; i++) {
        _square[i].textContent = gameBoard.getField(i);
      }
    };
  })();
})();
