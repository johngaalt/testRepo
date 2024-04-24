import { BoardProps } from "./App";

export function Square({ value, onSquareClick }: BoardProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
