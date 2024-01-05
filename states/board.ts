import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

interface BoardState {
  board: number[][];
  zones: number[][][];
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
const WIDTH_SIZE_HALF = Math.floor(WIDTH_SIZE / 2);
const WIDTH_SIZE_QUARTER = Math.floor(WIDTH_SIZE / 4);
const WIDTH_SIZE_THREE_QUARTER = Math.floor((WIDTH_SIZE / 4) * 3);

const HEIGHT_SIZE = 20;
const HEIGHT_SIZE_QUARTER = HEIGHT_SIZE / 4;
const HEIGHT_SIZE_HALF = HEIGHT_SIZE / 2;

const getInitialBoard = () =>
  Array.from({ length: HEIGHT_SIZE }, () => Array(WIDTH_SIZE).fill(-1));

const getZones = () => {
  const zones: number[][][] = [];

  const zoneOne = [];
  for (let i = 0; i < HEIGHT_SIZE_QUARTER; i++) {
    for (let j = 1; j < WIDTH_SIZE_HALF; j++) {
      if (j > i) {
        zoneOne.push([i, j]);
      }
    }
  }

  const zoneTwo = [];
  for (let i = 0; i < HEIGHT_SIZE_QUARTER; i++) {
    for (let j = WIDTH_SIZE_HALF; j < WIDTH_SIZE; j++) {
      if (i + j < WIDTH_SIZE - 1) {
        zoneTwo.push([i, j]);
      }
    }
  }

  const zoneThree = [];
  for (let i = HEIGHT_SIZE_QUARTER; i < HEIGHT_SIZE_HALF; i++) {
    for (let j = WIDTH_SIZE_QUARTER; j < WIDTH_SIZE_HALF; j++) {
      if (j > i) {
        zoneThree.push([i, j]);
      }
    }
  }

  const zoneFour = [];
  for (let i = HEIGHT_SIZE_QUARTER; i < HEIGHT_SIZE * 0.5; i++) {
    for (let j = WIDTH_SIZE_HALF; j < WIDTH_SIZE_THREE_QUARTER; j++) {
      if (i + j < WIDTH_SIZE - 1) {
        zoneFour.push([i, j]);
      }
    }
  }

  const zoneFive = [];
  for (let i = 0; i < HEIGHT_SIZE_HALF; i++) {
    for (let j = 0; j < WIDTH_SIZE_QUARTER; j++) {
      if (i >= j) {
        zoneFive.push([i, j]);
      }
    }
  }

  const zoneSix = [];
  for (let i = HEIGHT_SIZE_HALF; i < HEIGHT_SIZE; i++) {
    for (let j = 0; j < WIDTH_SIZE_QUARTER; j++) {
      if (i + j < HEIGHT_SIZE) {
        zoneSix.push([i, j]);
      }
    }
  }

  const zoneSeven = [];
  for (let i = 5; i < 10; i++) {
    for (let j = 5; j < 10; j++) {
      if (i >= j) {
        zoneSeven.push([i, j]);
      }
    }
  }

  const zoneEight = [];
  for (let i = 10; i < 15; i++) {
    for (let j = 5; j < 10; j++) {
      if (i + j < 20) {
        zoneEight.push([i, j]);
      }
    }
  }

  const zoneNine = [];
  for (let i = 15; i < 20; i++) {
    for (let j = 0; j < 11; j++) {
      if (i + j >= 20) {
        zoneNine.push([i, j]);
      }
    }
  }

  const zoneTen = [];
  for (let i = 15; i < 20; i++) {
    for (let j = 11; j < 21; j++) {
      if (i > j - 2) {
        zoneTen.push([i, j]);
      }
    }
  }

  const zoneEleven = [];
  for (let i = 10; i < 15; i++) {
    for (let j = 5; j < 11; j++) {
      if (i + j >= 20) {
        zoneEleven.push([i, j]);
      }
    }
  }

  const zoneTwelve = [];
  for (let i = 10; i < 15; i++) {
    for (let j = 11; j < 17; j++) {
      if (i > j - 2) {
        zoneTwelve.push([i, j]);
      }
    }
  }

  const zoneThirteen = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 17; j < 22; j++) {
      if (i + j >= 21) {
        zoneThirteen.push([i, j]);
      }
    }
  }

  const zoneFourteen = [];
  for (let i = 10; i < 20; i++) {
    for (let j = 17; j < 22; j++) {
      if (i < j - 1) {
        zoneFourteen.push([i, j]);
      }
    }
  }

  const zoneFifteen = [];
  for (let i = 5; i < 10; i++) {
    for (let j = 11; j < 17; j++) {
      if (i + j >= 21) {
        zoneFifteen.push([i, j]);
      }
    }
  }

  const zoneSixteen = [];
  for (let i = 10; i < 15; i++) {
    for (let j = 10; j < 17; j++) {
      if (i < j - 1) {
        zoneSixteen.push([i, j]);
      }
    }
  }

  zones.push(
    zoneOne,
    zoneTwo,
    zoneThree,
    zoneFour,
    zoneFive,
    zoneSix,
    zoneSeven,
    zoneEight,
    zoneNine,
    zoneTen,
    zoneEleven,
    zoneTwelve,
    zoneThirteen,
    zoneFourteen,
    zoneFifteen,
    zoneSixteen
  );

  return zones;
};

export const useBoardStore = create<BoardState>()(
  devtools(
    (set) => ({
      board: getInitialBoard(),
      zones: getZones(),
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
