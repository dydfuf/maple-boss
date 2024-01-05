import { useState } from "react";
import { useBoardStore } from "states/board";
import { usePiecesStore } from "states/pieces";
import BoardCell from "./BoardCell";
import useSolver from "./hook/useSolver";
import { Point } from "./util/point";

export default function UnionBoard() {
  const [dragging, setDragging] = useState(false);
  const [dragState, setDragState] = useState<number>(-1);
  const [pieceHistory, setPieceHistory] = useState<Point[][]>([]);
  const [isZoneSelect, setIsZoneSelect] = useState(false);

  const { board, setBoard, resetBoard, solvingState, setSolvingState, zones } =
    useBoardStore((state) => state);
  const { pieces } = usePiecesStore((state) => state);
  const { solve } = useSolver();

  const filledAmount = board.flat().filter((value) => value !== -1).length;
  const beFilledAmount = pieces.reduce(
    (acc, cur) => acc + cur.amount * cur.shape.flat().filter(Boolean).length,
    0
  );

  const getZone = (i: number, j: number) => {
    const zone = zones.find((zone) =>
      zone.some(([_i, _j]) => {
        if (_i === i && _j === j) return true;
        return false;
      })
    );
    return zone;
  };

  const flipCell = (i: number, j: number) => {
    if (isZoneSelect) {
      const zone = getZone(i, j);
      if (!zone) return;
      setBoard(
        board.map((row, x) =>
          row.map((cell, y) =>
            zone.some(([_i, _j]) => _i === x && _j === y)
              ? cell === -1
                ? 0
                : -1
              : cell
          )
        )
      );
      return;
    }

    setBoard(
      board.map((row, x) =>
        row.map((cell, y) =>
          x === i && y === j ? (cell === -1 ? 0 : -1) : cell
        )
      )
    );
  };

  const handleMouseDown = (i: number, j: number) => {
    if (solvingState !== "initial") return;
    const state = board[i][j] === -1 ? 0 : -1;
    setDragging(true);
    setDragState(state);
    flipCell(i, j);
  };

  const handleMouseUp = () => {
    if (solvingState !== "initial") return;

    setDragging(false);
    setDragState(-1);
  };

  const handleMouseOver = (i: number, j: number) => {
    if (solvingState !== "initial") return;

    if (dragging) {
      if (isZoneSelect) {
        const zone = getZone(i, j);
        if (!zone) return;
        setBoard(
          board.map((row, x) =>
            row.map((cell, y) =>
              zone.some(([_i, _j]) => _i === x && _j === y) ? dragState : cell
            )
          )
        );
        return;
      }
      setBoard(
        board.map((row, x) =>
          row.map((cell, y) => (x === i && y === j ? dragState : cell))
        )
      );
    }
  };

  const handleSolve = async () => {
    if (filledAmount === 0) return alert("유니온 보드를 채워주세요");

    if (filledAmount !== beFilledAmount)
      return alert("캐릭터 칸수와 유니온 보드의 칸수가 다릅니다");

    setSolvingState("solving");
    const { board, success, pieceHistory } = await solve();
    setSolvingState("solved");

    if (success) {
      setBoard(board);
      setPieceHistory(pieceHistory);
    } else {
      alert("보드를 채울 수 있는 경우의 수를 찾지 못했습니다.");
    }
  };

  const handleResetBoard = () => {
    resetBoard();
    setPieceHistory([]);
    setSolvingState("initial");
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mt-10 flex w-full">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isZoneSelect}
            onChange={(e) => setIsZoneSelect(e.target.checked)}
            className="h-20 w-20"
            id="zone-select"
          />
          <label htmlFor="zone-select" className="ml-10">
            영역 선택
          </label>
        </div>
        <button
          className="ml-auto flex shrink-0 items-center justify-center rounded-4 bg-purple-100 px-24 py-4 disabled:opacity-25"
          onClick={resetBoard}
          disabled={solvingState !== "initial"}
        >
          <span className="text-white">보드 초기화</span>
        </button>
      </div>
      <table className="mt-20 aspect-[22/20] w-full">
        <tbody>
          {board.map((row, i) => (
            <tr key={i}>
              {row.map((_, j) => (
                <BoardCell
                  key={`${i}-${j}`}
                  i={i}
                  j={j}
                  handleMouseUp={handleMouseUp}
                  handleMouseDown={handleMouseDown}
                  handleMouseOver={handleMouseOver}
                  pieceHistory={pieceHistory}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-20 flex justify-between rounded-8 border-2 p-20">
        <div className="flex flex-col">
          <p>보드에 채워야 할 칸 : {beFilledAmount}칸</p>
          <p>보드에 채워진 칸 : {filledAmount}칸</p>
        </div>
        <div className="flex items-center gap-20">
          <button
            className="flex shrink-0 items-center justify-center rounded-4 border-1 border-gray-700 bg-gray-100 px-52 py-8 disabled:opacity-25"
            onClick={handleResetBoard}
            disabled={solvingState !== "solved"}
          >
            <span className="text-20 font-bold text-black">초기화</span>
          </button>
          <button
            className="flex shrink-0 items-center justify-center rounded-4 bg-purple-100 px-52 py-8 disabled:opacity-25"
            onClick={handleSolve}
            disabled={solvingState !== "initial"}
          >
            <span className="text-20 font-bold text-white">실행</span>
          </button>
        </div>
      </div>
      <div className="mt-20 flex justify-between rounded-8 border-2 p-20">
        <p className="text-20 font-bold">
          @TODO: 로그인 하여 현재 유니온 시뮬레이션을 저장해보세요
        </p>
      </div>
    </div>
  );
}
