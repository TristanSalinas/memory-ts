/* UTILS */
function shuffleArray(arrayToShuffle: any[]) {
  for (let i = arrayToShuffle.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arrayToShuffle[i];
    arrayToShuffle[i] = arrayToShuffle[j];
    arrayToShuffle[j] = temp;
  }
  return arrayToShuffle;
}
/*****************     */

export function boardStateFactory() {
  let picturesIdPairs: number[] = [];

  for (let i = 0; i < 14; i++) {
    picturesIdPairs.push(i + 1, i + 1);
  }

  picturesIdPairs = shuffleArray(picturesIdPairs);

  let dimensions = { col: 7, row: 4 };

  const getBoardState = () => {
    return picturesIdPairs;
  };

  const getDimensions = () => {
    return dimensions;
  };

  const shuffleBoard = () => {
    picturesIdPairs = shuffleArray(picturesIdPairs);
  };

  return { getBoardState, getDimensions, shuffleBoard };
}
