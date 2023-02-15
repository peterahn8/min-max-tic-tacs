(function () {
  const gameBoard = (() => {
    let field = ['', '', '', '', '', '', '', '', ''];

    const setField = (index, val) => {
      field[index] = val;
    };

    const resetField = () => {
      for (let i = 0; i < field.length; i++) {
        field[i] = '';
      }
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

    const resetGame = () => {
      gameBoard.resetField();
      turn = 1;
      gameOver = false;
    };

    const getCurrPlayerSign = () => {
      if (turn % 2 === 0) {
        return playerO.getSign();
      } else {
        return playerX.getSign();
      }
    };

    const checkForTie = () => {
      if (gameBoard.field.every((val) => val !== '')) {
        gameOver = true;
        return true;
      }
      return false;
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
        if (winConditions[c].every((val) => gameBoard.getField(val) === 'X')) {
          gameOver = true;
          return playerX.getSign();
        }

        if (winConditions[c].every((val) => gameBoard.getField(val) === 'O')) {
          gameOver = true;
          return playerO.getSign();
        }
      }
    };

    return {
      playRound,
      resetGame,
      getCurrPlayerSign,
      checkForWinner,
      checkForTie,
    };
  })();

  const displayController = (() => {
    const _square = document.querySelectorAll('.square');
    const result = document.querySelector('#result');
    const resetButton = document.querySelector('#reset');

    _square.forEach((square) =>
      square.addEventListener('click', () => {
        if (square.textContent !== '') return;
        gameController.playRound(square.id);
        updateGameBoard();
        updateResult();
      })
    );

    resetButton.addEventListener('click', () => {
      gameController.resetGame();

      updateGameBoard();
      updateResult();
      console.log(gameBoard.field);
    });

    const updateGameBoard = () => {
      for (let i = 0; i < _square.length; i++) {
        _square[i].textContent = gameBoard.getField(i);
      }
    };

    const updateResult = () => {
      result.textContent = `Player ${gameController.getCurrPlayerSign()}, make your move!`;

      if (gameController.checkForTie() === true) {
        result.textContent = `The game was a tie!`;
      }

      if (gameController.checkForWinner() === 'X') {
        console.log('X won');
        result.textContent = `X won!`;
      }

      if (gameController.checkForWinner() === 'O') {
        console.log('O won');
        result.textContent = `O won!`;
      }
    };

    updateResult();

    return { updateResult };
  })();
})();
