(function () {
  const gamefield = (() => {
    const field = ['', '', '', '', '', '', '', '', ''];

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

    const getFieldArray = () => {
      return field;
    }

    const getEmptyFieldIndexes = () => {
      const emptyFields = [];
      for (let i = 0; i < field.length; i++) {
        if (field[i] === '') {
          emptyFields.push(i);
        }
      }
      console.log('The empty indexes are: ' + emptyFields);
      return emptyFields;
    };

    return { field, setField, resetField, getField, getEmptyFieldIndexes };
  })();

  const Player = (sign) => {
    this.sign = sign;

    const getSign = () => {
      return sign;
    };

    return { getSign };
  };

  const minimaxAI = (newBoard, player) => {
    const availSpots = gamefield.getEmptyFieldIndexes();

    const winning = (player) => {
      const field = gamefield.getFieldArray();
      if (
        (field[0] === player && field[1] === player && field[2] === player) ||
        (field[3] === player && field[4] === player && field[5] === player) ||
        (field[6] === player && field[7] === player && field[8] === player) ||
        (field[0] === player && field[3] === player && field[6] === player) ||
        (field[1] === player && field[4] === player && field[7] === player) ||
        (field[2] === player && field[5] === player && field[8] === player) ||
        (field[0] === player && field[4] === player && field[8] === player) ||
        (field[2] === player && field[4] === player && field[6] === player)
      ) {
        console.log('WINNER');
        return true;
      } else {
        console.log('NO WINNER YET');
        return false;
      }
    };

    if (winning(newBoard, gameController.playerX)) {
      return { score: -10 };
    } else if (winning(newBoard, gameController.playerO)) {
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }
  };

  const gameController = (() => {
    const playerX = Player('X');
    const playerO = Player('O');
    let turn = 1;
    let gameOver = false;

    const playRound = (index, field) => {
      gamefield.setField(index, getCurrPlayerSign());
      console.log(`${getCurrPlayerSign()} made a move`);
      checkForTie();
      checkForWinner();
      turn++;
      minimaxAI();
    };

    const resetGame = () => {
      gamefield.resetField();
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
      if (gamefield.field.every((val) => val !== '')) {
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
        if (winConditions[c].every((val) => gamefield.getField(val) === 'X')) {
          gameOver = true;
          return playerX.getSign();
        }

        if (winConditions[c].every((val) => gamefield.getField(val) === 'O')) {
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
        updateGamefield();
        updateResult();
      })
    );

    resetButton.addEventListener('click', () => {
      gameController.resetGame();

      updateGamefield();
      updateResult();
      console.log(gamefield.field);
    });

    const updateGamefield = () => {
      for (let i = 0; i < _square.length; i++) {
        _square[i].textContent = gamefield.getField(i);
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
