import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";
import { defaultPieces } from "components/UnionSimulator/contant";
import { Piece } from "components/UnionSimulator/util/piece";

const getPieces = () => {
  const pieces = [];
  for (const piece of defaultPieces) {
    pieces.push(Piece.createPiece(piece, 0));
  }
  return pieces;
};

const getPieceColours = () => {
  const pieceColours = new Map<number, string>();
  pieceColours.set(-1, "white");
  pieceColours.set(0, "grey");
  for (let i = 0; i < 2; i++) {
    pieceColours.set(1 + i * 18, "lightpink");
    pieceColours.set(2 + i * 18, "lightcoral");
    pieceColours.set(3 + i * 18, "indianred");
    pieceColours.set(4 + i * 18, "darkseagreen");
    pieceColours.set(5 + i * 18, "firebrick");
    pieceColours.set(6 + i * 18, "mediumseagreen");
    pieceColours.set(7 + i * 18, "purple");
    pieceColours.set(8 + i * 18, "dodgerblue");
    pieceColours.set(9 + i * 18, "lightsteelblue");
    pieceColours.set(10 + i * 18, "maroon");
    pieceColours.set(11 + i * 18, "green");
    pieceColours.set(12 + i * 18, "indigo");
    pieceColours.set(13 + i * 18, "blue");
    pieceColours.set(14 + i * 18, "cadetblue");
    pieceColours.set(15 + i * 18, "mediumpurple");
    pieceColours.set(16 + i * 18, "aquamarine");
    pieceColours.set(17 + i * 18, "aquamarine");
    pieceColours.set(18 + i * 18, "aquamarine");
  }
  return pieceColours;
};

interface PiecesState {
  pieces: Piece[];
  initializePieces: () => void;
  pieceColours: Map<number, string>;
  setAmount: (index: number, amount: number) => void;
  getAllAmounts: () => number;
}

export const usePiecesStore = create<PiecesState>()(
  devtools(
    (set) => ({
      pieces: [],
      initializePieces: () =>
        set((state) => {
          return { ...state, pieces: getPieces() };
        }),
      pieceColours: getPieceColours(),
      setAmount: (index: number, amount: number) =>
        set((state) => {
          const pieces = state.pieces;
          pieces[index].amount = amount;
          return { pieces };
        }),
      getAllAmounts: () => {
        let total = 0;
        for (const piece of usePiecesStore.getState().pieces) {
          total += piece.amount;
        }
        return total;
      },
    }),
    {
      name: "pieces-storage",
    }
  )
);
