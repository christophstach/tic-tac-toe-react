import { useState } from "react";
import { cloneDeep } from "lodash";

type BoardState = [
  [number, number, number],
  [number, number, number],
  [number, number, number]
];

interface BoardProps {
  onCellClick: (validMove: boolean) => void;
  currentPlayer: 1 | 2;
}

function hasWon(boardState: BoardState): number {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      boardState[i][0] === boardState[i][1] &&
      boardState[i][1] === boardState[i][2] &&
      boardState[i][0] !== 0
    ) {
      return boardState[i][0];
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      boardState[0][i] === boardState[1][i] &&
      boardState[1][i] === boardState[2][i] &&
      boardState[0][i] !== 0
    ) {
      return boardState[0][i];
    }
  }

  // Check diagonals
  if (
    boardState[0][0] === boardState[1][1] &&
    boardState[1][1] === boardState[2][2] &&
    boardState[0][0] !== 0
  ) {
    return boardState[0][0];
  }

  if (
    boardState[0][2] === boardState[1][1] &&
    boardState[1][1] === boardState[2][0] &&
    boardState[0][2] !== 0
  ) {
    return boardState[0][2];
  }

  // If no winner, return 0
  return 0;
}

export default function Board(props: BoardProps) {
  const [boardState, setBoardState] = useState<BoardState>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  function handleCellClick(rowIndex: number, colIndex: number) {
    if (boardState[rowIndex][colIndex] === 0) {
      const newBoardState = cloneDeep(boardState);
      newBoardState[rowIndex][colIndex] = props.currentPlayer;

      setBoardState(newBoardState);

      const won = hasWon(newBoardState);
      if (won === 0) {
        props.onCellClick(true);
      } else {
        alert(`Player ${won === 1 ? "X" : "O"} has won!`);
      }
    } else {
      props.onCellClick(false);
    }
  }

  return (
    <div className="grid w-fit grid-cols-3 grid-rows-3 gap-5">
      {boardState.map((row, rowIndex) => {
        return row.map((col, colIndex) => {
          return (
            <div
              key={colIndex}
              className="flex h-10 w-10 cursor-pointer items-center justify-center border"
              onClick={() => {
                handleCellClick(rowIndex, colIndex);
              }}
            >
              {col === 1 && "X"}
              {col === 2 && "O"}
            </div>
          );
        });
      })}
    </div>
  );
}
