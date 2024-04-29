import { useState } from "react";
import Board from "./Board";

export interface GameProps {
  xIsNext: boolean;
  squares: string[];
  onPlay: (nextSquares: string[]) => void;
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState(Array(9).fill(null));
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares: string[]) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div>{}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}
