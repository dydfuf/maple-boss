import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface BoardState {
  board: number[][];
  setBoard: (board: number[][]) => void;
  resetBoard: () => void;
  solvingState: SolvingState;
  setSolvingState: (state: SolvingState) => void;
}

type SolvingState = "initial" | "solving" | "solved";
export const SolvingStateMap: Record<SolvingState, string> = {
  initial: "대기중",
  solving: "계산중",
  solved: "완료",
};

const WIDTH_SIZE = 22;
const HEIGHT_SIZE = 20;
const getInitialBoard = () =>
  Array.from({ length: HEIGHT_SIZE }, () => Array(WIDTH_SIZE).fill(-1));

export const useBoardStore = create<BoardState>()(
  devtools(
    (set) => ({
      board: getInitialBoard(),

      setBoard: (board: number[][]) =>
        set((state) => {
          return { ...state, board };
        }),
      resetBoard: () =>
        set((state) => {
          return {
            ...state,
            board: getInitialBoard(),
          };
        }),
      solvingState: "initial",
      setSolvingState: (solvingState: SolvingState) =>
        set((state) => {
          return { ...state, solvingState };
        }),
    }),
    {
      name: "board",
    }
  )
);
