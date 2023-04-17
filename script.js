(function () {
  const human = 'X';
  const minimax = 'O';

  // Manage the game board
  const gameField = (() => {
    const field = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const resetField = () => {
      for (let i = 0; i < field.length; i++) {
        field[i] = i;
      }
      console.log(`Field was reset to: [${field}].`);
    };

    const getFieldIndex = (index) => {
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

    return { field, resetField, getFieldIndex, getEmptyFieldIndexes };
  })();

  // Manage the game logic
  const gameController = (() => {
    let turn = 1;
    let losses = 0;

    const playRound = (val) => {
      // Prevent `minimaxLogic` from traversing [moves] needlessly on the last round
      if (turn === 10) {
        return false;
      }

      if (getCurrPlayer() === minimax) {
        turn++;
        const index = minimaxLogic(gameField.field, minimax).index;
        gameField.field[index] = minimax;
        console.log(`Minimax decided. Current turn is ${turn}.`);
        console.log(`Waiting for human...`);
      } else {
        gameField.field[val] = human;
        turn++;
        console.log(`Human decided. Current turn is ${turn}.`);
      }
    };

    const resetGame = () => {
      gameField.resetField();
      turn = 1;
    };

    const getCurrPlayer = () => {
      if (turn % 2 === 0) {
        return minimax;
      }
      return human;
    };

    const checkTie = () => {
      if (
        gameField.field.every(
          (index) => (index === human || index === minimax) && !checkWin()
        )
      ) {
        return true;
      }
    };

    const checkLoss = () => {
      if (checkTie() || checkWin(human) || checkWin(minimax)) {
        return true;
      }
      return false;
    };

    // Control the AI player
    const minimaxLogic = (newField, player) => {
      // Only look at available `field` indexes to reduce time complexity
      const availIndex = gameField.getEmptyFieldIndexes();

      // Recursively rank terminal states
      if (checkWin(human)) {
        return { score: -10 };
      } else if (checkWin(minimax)) {
        return { score: 10 };
      } else if (availIndex.length === 0) {
        return { score: 0 };
      }

      const moves = [];

      // Recursively loop through possible moves, based on available squares
      for (let i = 0; i < availIndex.length; i++) {
        const move = {};
        move.index = newField[availIndex[i]];

        if (player === human) {
          newField[availIndex[i]] = human;
        } else {
          newField[availIndex[i]] = minimax;
        }
        if (player === minimax) {
          const result = minimaxLogic(newField, human);
          move.score = result.score;
        } else {
          const result = minimaxLogic(newField, minimax);
          move.score = result.score;
        }

        newField[availIndex[i]] = move.index;
        moves.push(move);
      }

      let bestMove;

      // Count up from -10000 or count down from 10000, depending on current player
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

      // Return the best scoring move
      return moves[bestMove];
    };

    const checkWin = (player) => {
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
        return true;
      }
    };

    return {
      playRound,
      resetGame,
      getCurrPlayer,
      checkTie,
      minimaxLogic,
      checkWin,
      checkLoss,
      turn,
    };
  })();

  // Display the game board and handle user input
  const displayController = (() => {
    const _square = document.querySelectorAll('.square');
    const _buttonByID = document.querySelectorAll('button.square');
    const _display = document.querySelector('#display');
    const _result = document.querySelector('#result');
    const _resetButton = document.querySelector('#reset');

    _square.forEach((square) =>
      square.addEventListener('click', () => {
        if (
          gameField.field[square.id] === human ||
          gameField.field[square.id] === minimax ||
          gameController.checkLoss()
        ) {
          return false;
        }
        gameController.playRound(square.id);
        if (gameController.getCurrPlayer() === minimax) {
          gameController.playRound(square.id);
        }
        updateSquares();
        updateResult();
        if (gameController.checkLoss()) {
          highlight();
        }
      })
    );

    _resetButton.addEventListener('click', () => {
      gameController.resetGame();
      updateResult();
      updateSquares();
      resetClasses();
    });

    const updateSquares = () => {
      for (let i = 0; i < _square.length; i++) {
        if (
          gameField.getFieldIndex(i) === human ||
          gameField.getFieldIndex(i) === minimax
        ) {
          if (gameField.getFieldIndex(i) === minimax) {
            _square[i].classList.add('squareFade');
          }
          _square[i].textContent = gameField.getFieldIndex(i);
        } else {
          _square[i].textContent = '';
        }
      }
    };

    const updateResult = () => {
      _result.textContent = `Show me your moves!`;

      if (gameController.checkTie()) {
        fadeResult();
        _result.textContent = getAnnoyed();
      } else if (gameController.checkWin(minimax)) {
        fadeResult();
        _result.textContent = getAnnoyed();
      } else if (gameController.checkWin(human)) {
        fadeResult();
        _result.textContent = `You won! Wait, that's impossible.`;
      }
    };

    // Return quips depending on loss or tie
    // These are AI-generated strings, courtesy of Chat GPT-3
    const getAnnoyed = () => {
      const loseArray = [
        `Nice move! But I can see a few more steps ahead, can you keep up?`,
        `Looks like you're catching on! Don't worry, I'll try to make it interesting.`,
        `You're doing great! It's almost like you've got a little bit of Minimax in you.`,
        `Well played! It's always fun to have a challenge.`,
        `You're getting closer to beating me! But don't get too confident, I still have a few tricks up my sleeve.`,
        `You're putting up a good fight, but I'm programmed to win. Sorry!`,
        `Looks like I've got the upper hand. Don't worry, practice makes perfect!`,
        `I'm seeing some patterns in your moves. Don't worry, I won't tell anyone ;)`,
      ];

      const tieArray = [
        'You managed to hold your own against me. Impressive!',
        `Looks like we're evenly matched. Let's play again soon!`,
        'A tie? That just means we need a rematch to settle the score!',
        `We're both winners today! ...Sort of.`,
        `Well played! It's not easy to tie with me, you know.`,
        `A tie? I thought I had you there for a second. Good job holding your ground!`,
        `Well, a tie isn't a loss, but it's not a win either. Let's try again and see who comes out on top.`,
        `Well played, my friend. I think we've both earned the right to call ourselves average Tic-Tac-Toe players.`,
        `A tie? That's almost as frustrating as a loss. I guess we'll just have to keep playing until someone wins.`,
      ];

      if (gameController.checkWin(minimax)) {
        return loseArray[Math.floor(Math.random() * loseArray.length)];
      } else if (gameController.checkTie()) {
        return tieArray[Math.floor(Math.random() * tieArray.length)];
      }
    };

    const highlight = () => {
      const combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < combinations.length; i++) {
        if (
          combinations[i].every(
            (val) => gameField.getFieldIndex(val) === minimax
          )
        ) {
          combinations[i].forEach((val) =>
            _buttonByID[val].classList.add('loseHighlight')
          );
        }
      }

      if (gameController.checkTie()) {
        _buttonByID.forEach((val) => {
          val.classList.add('tieHighlight');
        });
      }
    };

    const fadeDisplay = () => {
      _display.classList.add('displayFade');
      _resetButton.classList.add('displayFade');

      setTimeout(() => {
        _display.classList.remove('displayFade');
        _resetButton.classList.remove('displayFade');
      }, 800);
    };

    const fadeResult = () => {
      _result.classList.add('resultFade');

      setTimeout(() => {
        _result.classList.remove('resultFade');
      }, 400);
    };

    const resetClasses = () => {
      _buttonByID.forEach((val) => {
        val.classList.remove('loseHighlight', 'tieHighlight', 'squareFade');
      });
      fadeDisplay();
      fadeResult();
    };

    return { updateResult };
  })();

  // Initialize the result readout
  displayController.updateResult();
})();
