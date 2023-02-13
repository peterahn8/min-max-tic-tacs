(function () {
  const gameBoard = (() => {
    let field = ['', '', '', '', '', '', '', '', ''];

    const setField = (i, val) => {
      field[i] = val;
      console.log(field);
    };

    const resetField = () => {
      field = ['', '', '', '', '', '', '', '', ''];
    };

    const getField = () => {
      console.log(field);
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


    const updateGameBoard = () => {
      
    };

    return { updateGameBoard };
  })();

  displayController.updateGameBoard();

})();
