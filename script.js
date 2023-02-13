(function () {
  const gameBoard = (() => {
    let field = ['', '', '', '', '', '', '', '', ''];

    const setField = (index, val) => {
      field[index] = val;
    };

    const resetField = () => {
      field = ['', '', '', '', '', '', '', '', ''];
    };

    const getField = () => {
      return field;
    };

    return { setField, resetField, getField };
  })();

  const gameController = (() => {
    const playerX = 'X';
    const playerO = 'O';

    const playRound = (index) => {
      gameBoard.setField(index, playerX);
    };

    return { playRound };
  })();

  const displayController = (() => {
    const _square = document.querySelectorAll('.square');

    _square.forEach((square) =>
      square.addEventListener('click', (el) => {
        gameController.playRound(parseInt(el.target.dataset.index));
        updateGameBoard();
      })
    );

    const updateGameBoard = () => {
      for (let i = 0; i < _square.length; i++) {
        _square[i].textContent = gameBoard.getField(i);
      }
    }
  })();

  return {};
})();
