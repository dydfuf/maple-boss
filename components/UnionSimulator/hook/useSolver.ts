import { cloneDeep } from "lodash-es";
import { useBoardStore } from "states/board";
import { usePiecesStore } from "states/pieces";
import { LegionSolver } from "../util/legion_solver";

export default function useSolver() {
  const { pieces } = usePiecesStore((state) => state);
  const { board } = useBoardStore((state) => state);

  const solve = async () => {
    const downBoard: number[][] = [];
    for (let i = 0; i < board.length; i++) {
      downBoard[i] = [];
      for (let j = 0; j < board[0].length; j++) {
        downBoard[i][j] = board[board.length - 1 - i][board[0].length - 1 - j];
      }
    }
    const rightBoard: number[][] = [];
    for (let i = 0; i < board[0].length; i++) {
      rightBoard[i] = [];
      for (let j = 0; j < board.length; j++) {
        rightBoard[i][j] = board[board.length - j - 1][i];
      }
    }
    const leftBoard: number[][] = [];
    for (let i = 0; i < board[0].length; i++) {
      leftBoard[i] = [];
      for (let j = 0; j < board.length; j++) {
        leftBoard[i][j] = board[j][board[0].length - 1 - i];
      }
    }

    let pieceHistory;
    const legionSolvers = [];
    legionSolvers.push(new LegionSolver(board, cloneDeep(pieces), () => false));
    legionSolvers.push(
      new LegionSolver(rightBoard, cloneDeep(pieces), () => false)
    );
    legionSolvers.push(
      new LegionSolver(downBoard, cloneDeep(pieces), () => false)
    );
    legionSolvers.push(
      new LegionSolver(leftBoard, cloneDeep(pieces), () => false)
    );

    const runRotated = legionSolvers[0].longSpaces.length !== 0;
    const boardPromise = legionSolvers[0].solve();
    let success;
    if (runRotated) {
      const rightBoardPromise = legionSolvers[1].solve();
      const downBoardPromise = legionSolvers[2].solve();
      const leftBoardPromise = legionSolvers[3].solve();
      success = await Promise.race([
        boardPromise,
        rightBoardPromise,
        downBoardPromise,
        leftBoardPromise,
      ]);
    } else {
      success = await boardPromise;
    }

    for (const solver of legionSolvers) {
      solver.stop();
    }

    let finishedSolver;

    if (legionSolvers[0].success !== undefined) {
      for (let i = 0; i < legionSolvers[0].board.length; i++) {
        for (let j = 0; j < legionSolvers[0].board[0].length; j++) {
          board[i][j] = legionSolvers[0].board[i][j];
        }
      }
      finishedSolver = legionSolvers[0];
      pieceHistory = legionSolvers[0].history;
    } else if (legionSolvers[1].success !== undefined) {
      for (let i = 0; i < legionSolvers[1].board[0].length; i++) {
        for (let j = 0; j < legionSolvers[1].board.length; j++) {
          board[i][j] =
            legionSolvers[1].board[j][legionSolvers[1].board[0].length - 1 - i];
        }
      }

      for (const piece of legionSolvers[1].history) {
        for (const point of piece) {
          const holder = point.y;
          point.y = legionSolvers[1].board[0].length - 1 - point.x;
          point.x = holder;
        }
      }
      finishedSolver = legionSolvers[1];
      pieceHistory = legionSolvers[1].history;
    } else if (legionSolvers[2].success !== undefined) {
      for (let i = 0; i < legionSolvers[2].board.length; i++) {
        for (let j = 0; j < legionSolvers[2].board[0].length; j++) {
          board[i][j] =
            legionSolvers[2].board[legionSolvers[2].board.length - 1 - i][
              legionSolvers[2].board[0].length - 1 - j
            ];
        }
      }

      for (const piece of legionSolvers[2].history) {
        for (const point of piece) {
          point.y = legionSolvers[2].board.length - 1 - point.y;
          point.x = legionSolvers[2].board[0].length - 1 - point.x;
        }
      }
      finishedSolver = legionSolvers[2];
      pieceHistory = legionSolvers[2].history;
    } else if (legionSolvers[3].success !== undefined) {
      for (let i = 0; i < legionSolvers[3].board[0].length; i++) {
        for (let j = 0; j < legionSolvers[3].board.length; j++) {
          board[i][j] =
            legionSolvers[3].board[legionSolvers[3].board.length - j - 1][i];
        }
      }

      for (const piece of legionSolvers[3].history) {
        for (const point of piece) {
          const holder = point.x;
          point.x = legionSolvers[3].board.length - 1 - point.y;
          point.y = holder;
        }
      }
      finishedSolver = legionSolvers[3];
      pieceHistory = legionSolvers[3].history;
    }

    return {
      board: finishedSolver?.board,
      success,
      pieceHistory,
    };
  };

  return {
    solve,
  };
}
