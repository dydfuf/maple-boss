import { useBoardStore } from "states/board";
import { usePiecesStore } from "states/pieces";
import { cn } from "utils/common";

interface Props {
  i: number;
  j: number;
  handleMouseDown: (i: number, j: number) => void;
  handleMouseUp: () => void;
  handleMouseOver: (i: number, j: number) => void;
}

export default function BoardCell({
  i,
  j,
  handleMouseDown,
  handleMouseUp,
  handleMouseOver,
}: Props) {
  const { board } = useBoardStore((state) => state);
  const { pieceColours } = usePiecesStore((state) => state);

  const isTopBorder =
    i === 0 ||
    i === board.length / 2 ||
    (i % 5 === 0 && j > 4 && j < board[0].length - 5) ||
    (i === j && i < board.length / 2) ||
    (i - 1 === board.length - j && i < board.length / 2);
  const isBottomBorder =
    i === board.length - 1 ||
    (i === board.length - j - 1 && i > board.length / 2 - 1) ||
    (i + 2 === j && i > board.length / 2 - 1);
  const isLeftBorder =
    j === 0 ||
    j === board[0].length / 2 ||
    ((j === 5 || j === 17) && i > 4 && i < board.length - 5) ||
    (i + 1 === j && i < board.length / 2) ||
    (i - 1 === board.length - j && i < board.length / 2) ||
    (i + 2 === j && i > board.length / 2 - 1);
  const isRightBorder =
    j === board[0].length - 1 ||
    (i === board.length - j - 1 && i > board.length / 2 - 1);

  const backgroundColor = pieceColours.get(board[i][j]);

  return (
    <td
      onMouseDown={() => handleMouseDown(i, j)}
      onMouseUp={handleMouseUp}
      onMouseOver={() => handleMouseOver(i, j)}
      className={cn("cursor-pointer border-1", {
        "border-t-2 border-t-black": isTopBorder,
        "border-b-2 border-b-black": isBottomBorder,
        "border-l-2 border-l-black": isLeftBorder,
        "border-r-2 border-r-black": isRightBorder,
        "border-none": board[i][j] > 1,
      })}
      style={{ backgroundColor }}
    />
  );
}
