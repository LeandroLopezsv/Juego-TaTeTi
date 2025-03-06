document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const cells = document.querySelectorAll("[data-cell]");
  const restartButton = document.getElementById("restart-button");
  const startButton = document.getElementById("start-button");
  const player1ScoreElem = document.getElementById("player1-score");
  const player2ScoreElem = document.getElementById("player2-score");
  const gameOverMessage = document.getElementById("game-over-message");
  const winnerMessage = document.getElementById("winner-message");
  const playAgainButton = document.getElementById("play-again-button");
  const exitButton = document.getElementById("exit-button");

  let player1Score = 0;
  let player2Score = 0;
  let currentPlayer = "X";
  let gameActive = true;
  let gameState = ["", "", "", "", "", "", "", "", ""];

  const winningMessage = () => `El jugador ${currentPlayer} ha ganado 🥇!`;
  const drawMessage = () => `¡Es un empate! 👌`;
  const finalWinningMessage = (player) =>
    `🎉 ¡El jugador ${player} ha ganado el juego! 🎉`;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
  }

  function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      if (currentPlayer === "X") {
        player1Score++;
        player1ScoreElem.textContent = player1Score;
      } else {
        player2Score++;
        player2ScoreElem.textContent = player2Score;
      }

      Swal.fire({
        title: "¡Felicidades!",
        text: winningMessage(),
        icon: "success",
        confirmButtonText: "¡Seguimos Jugando!",
      });

      gameActive = false;
      checkGameWinner();
      return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {

      Swal.fire({
        title: "¡Que parejo!",
        text: drawMessage(),
        icon: "success",
        confirmButtonText: "¡Seguimos Jugando!",
      });
    }

    handlePlayerChange();
  }

  function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
  }

  function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => {
      cell.innerHTML = "";
      cell.classList.remove("x");
      cell.classList.remove("o");
    });
  }

  function handleStartGame() {
    player1Score = 0;
    player2Score = 0;
    player1ScoreElem.textContent = player1Score;
    player2ScoreElem.textContent = player2Score;
    handleRestartGame();
  }

  function checkGameWinner() {
    if (player1Score === 3 || player2Score === 3) {
      const winner = player1Score === 3 ? "1" : "2";
      winnerMessage.textContent = finalWinningMessage(winner);
      gameOverMessage.style.display = "block";
      board.style.display = "none";
      startButton.style.display = "none";
      restartButton.style.display = "none";
      playAgainButton.style.display = "block;";
      playAgainButton.style.margin = "auto;";
    }
  }

  function handlePlayAgain() {
    gameOverMessage.style.display = "none";
    board.style.display = "grid";
    startButton.style.display = "block";
    restartButton.style.display = "block";

    handleStartGame();
  }

  function handleExit() {
    gameOverMessage.style.display = "none";
    board.style.display = "none";
    startButton.style.display = "none";
    restartButton.style.display = "none";

    /*alert("💪¡Gracias por jugar! ");*/

    Swal.fire({
      title: "¡Gran partida!",
      text: "💪¡Gracias por jugar!",
      icon: "fa fa-",
      confirmButtonText: "¡Nos vemos!",
    });
  }

  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  restartButton.addEventListener("click", handleRestartGame);
  startButton.addEventListener("click", handleStartGame);
  playAgainButton.addEventListener("click", handlePlayAgain);
  exitButton.addEventListener("click", handleExit);

});
