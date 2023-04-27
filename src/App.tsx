import { useState } from "react";
import Board from "./components/Board";
import clsx from "clsx";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);

  function handleCellClick(validMove: boolean) {
    if (validMove) {
      if (currentPlayer === 1) {
        setCurrentPlayer(2);
      } else {
        setCurrentPlayer(1);
      }
    }
  }

  return (
    <main className="container mx-auto mt-20 flex items-center justify-center gap-10">
      <div
        className={clsx(
          "flex h-10 w-10 items-center justify-center",
          currentPlayer === 1 && "bg-primary text-primary-content"
        )}
      >
        X
      </div>
      <div>
        <Board currentPlayer={currentPlayer} onCellClick={handleCellClick} />
      </div>
      <div
        className={clsx(
          "flex h-10 w-10 items-center justify-center",
          currentPlayer === 2 && "bg-primary text-primary-content"
        )}
      >
        O
      </div>
    </main>
  );
}

export default App;
