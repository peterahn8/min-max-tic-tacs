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
      console.log(field);
      return field[index];
    };

    return { setField, resetField, getField };
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

    const playRound = (index) => {
      gameBoard.setField(index, getCurrPlayerSign());
      console.log(`${getCurrPlayerSign()} made a move`);
      turn++;
    };

    const getCurrPlayerSign = () => {
      if (turn % 2 === 0) {
        return playerO.getSign();
      } else {
        return playerX.getSign();
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
