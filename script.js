(function () {
  const gameBoard = () => {
    let field = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const setVal = (i, val) => {
      field[i] = val;
    };

    return { setVal };
  };
})();
