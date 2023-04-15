(function () {
  const human = 'X';
  const minimax = 'O';

  const gameField = (() => {
    const field = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const resetField = () => {
      for (let i = 0; i < field.length; i++) {
        field[i] = i;
      }
    };

    const getField = (index) => {
      return field[index];
    };

    const getEmptyFieldIndexes = () => {
      const emptyFields = [];
      for (let i = 0; i < field.length; i++) {
        if (field[i] === i) {
          emptyFields.push(i);
        }
      }
      return emptyFields;
    };

    return { field, resetField, getField, getEmptyFieldIndexes };
  })();

  const gameController = (() => {
    let turn = 1;
    let gameOver = false;

    const playRound = (val) => {
      if (getCurrPlayer() === minimax) {
        turn++;
        const index = minimaxLogic(gameField.field, minimax).index;
        gameField.field[index] = minimax;
        console.log(`Minimax has decided.` + ` ` + `Current turn: ` + turn);
      } else if (getCurrPlayer() === human) {
        gameField.field[val] = human;
        turn++;
        console.log(`Human has decided.` + ` ` + `Current turn: ` + turn);
      }
    };

    const resetGame = () => {
      gameField.resetField();
      turn = 1;
      gameOver = false;
    };

    const getCurrPlayer = () => {
      if (turn % 2 === 0) {
        return minimax;
      }
        return human;
    };

    const checkForTie = () => {
      if (
        gameField.field.every(
          (index) => (index === human || index === minimax) && !checkWinStates()
        )
      ) {
        gameOver = true;
        return true;
      }
    };

    const minimaxLogic = (newField, player) => {
      const availSpots = gameField.getEmptyFieldIndexes();

      if (checkWinStates(human)) {
        return { score: -10 };
      } else if (checkWinStates(minimax)) {
        return { score: 10 };
      } else if (availSpots.length === 0) {
        return { score: 0 };
      }

      const moves = [];

      for (let i = 0; i < availSpots.length; i++) {
        const move = {};
        move.index = newField[availSpots[i]];

        if (player === human) {
          newField[availSpots[i]] = human;
        } else if (player === minimax) {
          newField[availSpots[i]] = minimax;
        }
        if (player === minimax) {
          const result = minimaxLogic(newField, human);
          move.score = result.score;
        } else {
          const result = minimaxLogic(newField, minimax);
          move.score = result.score;
        }

        newField[availSpots[i]] = move.index;
        moves.push(move);
      }

      let bestMove;

      if (player === minimax) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
          if (moves[i].score > bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      } else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
          if (moves[i].score < bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      }

      return moves[bestMove];
    };

    const checkWinStates = (player) => {
      const field = gameField.field;

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
        gameOver = true;
        return true;
      } else {
        return false;
      }
    };

    return {
      playRound,
      resetGame,
      getCurrPlayer,
      checkForTie,
      minimaxLogic,
      checkWinStates,
      turn,
    };
  })();

  const displayController = (() => {
    const _square = document.querySelectorAll('.square');
    const result = document.querySelector('#result');
    const resetButton = document.querySelector('#reset');

    _square.forEach((square) =>
      square.addEventListener('click', () => {
        if (gameField.field[parseInt(square.id)] === human || gameField.field[parseInt(square.id)] === minimax) {
          return false;
        }
        gameController.playRound(square.id);
        if (gameController.getCurrPlayer() === minimax) {
          gameController.playRound(square.id);
        }
        updateDisplay();
        updateResult();
      })
    );

    resetButton.addEventListener('click', () => {
      gameController.resetGame();
      updateResult();
      updateDisplay();
      console.log(gameField.field)
    });

    const updateDisplay = () => {
      for (let i = 0; i < _square.length; i++) {
        if (
          gameField.getField(i) === human ||
          gameField.getField(i) === minimax
        ) {
          _square[i].textContent = gameField.getField(i);
        } else {
          _square[i].textContent = '';
        }
      }
    };

    const updateResult = () => {
      result.textContent = `Make your move!`;

      if (gameController.checkForTie() === true) {
        result.textContent = `The game was a tie!`;
      } else if (gameController.checkWinStates(minimax)) {
        console.log('Winner!');
        result.textContent = `Minimax wins!`;
      } else if (gameController.checkWinStates(human)) {
        result.textContent = `You won! Wait, that's impossible.`;
      }
    };

    return { updateResult, updateDisplay };
  })();

  displayController.updateResult();
})();
