import { gameBoard } from "../../components/gameboard/gameBoard";
import { boardStateFactory } from "./gameStarterUtils";
import { progressBarController } from "../../components/progressBar/progressBarController";
import "./gameScreen.css";

export default function gameScreen() {
  const screen = document.createElement("div");
  screen.classList.add("game-screen");
  const gameContainer = document.createElement("div");
  gameContainer.classList.add("game-container");
  const title = document.createElement("h1");
  title.textContent = "MEMORY";

  const boardState = boardStateFactory();

  function onTimerEnd() {
    boardState.shuffleBoard();
    init();
  }
  function handleGameWon() {
    boardState.shuffleBoard();
    init();
  }
  function init() {
    gameContainer.innerHTML = "";
    gameContainer.append(title);
    const board = gameBoard(boardState);
    const progressBar = progressBarController(60000);
    const progressBarDiv = progressBar.getProgresssBar();

    gameContainer.append(board);

    board.addEventListener("gameWon", handleGameWon);

    function onFirstClick() {
      progressBar.startTimer();
      board.removeEventListener("click", onFirstClick);
      progressBarDiv.addEventListener("timerEnd", onTimerEnd);
    }
    board.addEventListener("click", onFirstClick);

    gameContainer.append(progressBarDiv);

    screen.append(gameContainer);
  }

  init();

  return screen;
}
