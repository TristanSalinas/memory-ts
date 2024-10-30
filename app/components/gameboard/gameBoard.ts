import card from "./sub-components/card";
import {
  temporaryShow,
  show,
  hide,
  removeAllPictureAnimations,
} from "./boardDisplay";
import "./gameBoard.css";

export function gameBoard(boardData: any) {
  const board = document.createElement("div");
  board.classList.add("board");

  // memory of the memorygameboard + utils that come with it
  interface CardInfo {
    address: number;
    cardId: number;
    cardDiv: HTMLElement;
  }
  function createCellInfo(
    address: number,
    cardId: number,
    cardDiv: HTMLElement
  ): CardInfo {
    return { address, cardId, cardDiv };
  }
  let boardMemory: CardInfo[] = [];
  let clickCounter = 0;
  //Event to dispatch on win
  const gameWonEvent = new CustomEvent("gameWon", {
    detail: {
      clickCounter,
    },
  });
  function isWon() {
    console.log(boardMemory.length);
    return boardMemory.length === boardData.getBoardState().length;
  }
  /**************************** */
  // cell behaviour :
  // memoize currentAddress and currentCardId
  // for the returned function to use. This way each cell has it's onclick.
  // (next time i will use classes x) )
  /**************************** */

  function situationnalOnClick(
    currentAddress: number,
    currentCardId: number,
    boardMemory: CardInfo[]
  ) {
    const remember = (currentCardDiv: HTMLElement) => {
      boardMemory.push(
        createCellInfo(currentAddress, currentCardId, currentCardDiv)
      );
    };
    const isCellAlreadySaved = () => {
      return boardMemory.some(
        (cellInfo) => cellInfo.address === currentAddress
      );
    };
    const getLastCellSaved = () => {
      return boardMemory[boardMemory.length - 1].cardDiv;
    };
    const forgetLast = () => {
      boardMemory.pop();
    };
    /************************* */
    //Returned function/logic here
    /************************* */
    return function (eventOnCell: MouseEvent) {
      const currentCardDiv = eventOnCell.target as HTMLElement;
      if (!isCellAlreadySaved()) {
        clickCounter++;
        if (boardMemory.length % 2 === 0) {
          removeAllPictureAnimations();
          remember(currentCardDiv);
          show(currentCardDiv);
        } else {
          if (boardMemory[boardMemory.length - 1].cardId === currentCardId) {
            remember(currentCardDiv);
            show(currentCardDiv);
            if (isWon()) {
              board.dispatchEvent(gameWonEvent);
            }
          } else {
            hide(getLastCellSaved());
            temporaryShow(currentCardDiv);
            temporaryShow(getLastCellSaved());
            forgetLast();
          }
        }
      }
    };
  }

  /**************************** */
  // actual board filling
  /**************************** */

  let counter = 0;
  const { row, col } = boardData.getDimensions();

  for (let i = 0; i < col; i++) {
    const column = document.createElement("div");
    for (let j = 0; j < row; j++) {
      const cardId = boardData.getBoardState()[counter];
      column.append(
        card(cardId, situationnalOnClick(counter, cardId, boardMemory))
      );
      counter++;
    }
    board.append(column);
  }

  return board;
}
