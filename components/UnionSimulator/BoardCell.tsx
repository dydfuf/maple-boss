import { useBoardStore } from "states/board";
import { usePiecesStore } from "states/pieces";
import { cn } from "utils/common";
import { Point } from "./util/point";

interface Props {
  i: number;
  j: number;
  handleMouseDown: (i: number, j: number) => void;
  handleMouseUp: () => void;
  handleMouseOver: (i: number, j: number) => void;
  pieceHistory: Point[][];
}

export default function BoardCell({
  i,
  j,
  handleMouseDown,
  handleMouseUp,
  handleMouseOver,
  pieceHistory,
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

  const getPieceHistory = (i: number, j: number) => {
    const currentPieceHistory = pieceHistory.filter((piece) =>
      piece.some((point) => point.y === i && point.x === j)
    );
    return currentPieceHistory;
  };
  const currentPieceHistory = getPieceHistory(i, j);

  const colorBorderTop = currentPieceHistory.some((piece) =>
    piece.some((point) => point.y === i - 1 && point.x === j)
  );
  const colorBorderBottom = currentPieceHistory.some((piece) =>
    piece.some((point) => point.y === i + 1 && point.x === j)
  );
  const colorBorderLeft = currentPieceHistory.some((piece) =>
    piece.some((point) => point.y === i && point.x === j - 1)
  );
  const colorBorderRight = currentPieceHistory.some((piece) =>
    piece.some((point) => point.y === i && point.x === j + 1)
  );

  return (
    <td
      onMouseDown={() => handleMouseDown(i, j)}
      onMouseUp={handleMouseUp}
      onMouseOver={() => handleMouseOver(i, j)}
      className={cn("cursor-pointer border-1 text-12", {
        "border-t-2 border-t-black": isTopBorder,
        "border-b-2 border-b-black": isBottomBorder,
        "border-l-2 border-l-black": isLeftBorder,
        "border-r-2 border-r-black": isRightBorder,
        "border-black": board[i][j] > 1,
      })}
      style={{
        backgroundColor,
        borderTopColor: colorBorderTop ? pieceColours.get(board[i][j]) : "",
        borderBottomColor: colorBorderBottom
          ? pieceColours.get(board[i][j])
          : "",
        borderLeftColor: colorBorderLeft ? pieceColours.get(board[i][j]) : "",
        borderRightColor: colorBorderRight ? pieceColours.get(board[i][j]) : "",
      }}
    />
  );
}
