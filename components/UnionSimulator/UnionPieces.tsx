import { isNaN } from "lodash-es";
import { pieceDescriptions } from "components/UnionSimulator/contant";
import { usePiecesStore } from "states/pieces";

export default function UnionPieces() {
  const { pieces, initializePieces, pieceColours, setAmount, getAllAmounts } =
    usePiecesStore((state) => state);

  return (
    <div className="w-400 shrink-0 rounded-12 bg-gray-200 p-20">
      <div className="mb-20 flex items-center justify-between px-10">
        <p className="text-24 font-bold">{`총 캐릭터 수 : ${getAllAmounts()}`}</p>
        <button
          className="flex shrink-0 items-center justify-center rounded-4 bg-purple-100 px-20 py-4"
          onClick={() => {
            initializePieces();
          }}
        >
          <span className="text-white">초기화</span>
        </button>
      </div>
      <div className="flex justify-between pb-4 pl-10 pr-15 text-14">
        <p>직업명</p>
        <p>갯수</p>
      </div>
      <form className="flex flex-col gap-12">
        {pieces.map((piece, index) => {
          return (
            <div className="flex justify-center gap-12" key={index}>
              <div className="flex h-50 w-full items-center rounded-8 border-2 bg-white">
                <label
                  htmlFor={`piece${index + 1}`}
                  className="flex w-60 items-center justify-center"
                >
                  <table>
                    <tbody>
                      {piece.shape.map((row: number[], rowIndex: number) => (
                        <tr key={rowIndex}>
                          {row.map((num, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="h-9 w-9"
                              style={{
                                background: num
                                  ? pieceColours.get(index + 1)
                                  : "",
                              }}
                            ></td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </label>
                <div className="text-12">{pieceDescriptions[index]}</div>
              </div>
              <input
                className="flex h-50 w-50 items-center justify-center rounded-8 border-2 text-center"
                id={`piece${index + 1}`}
                value={piece.amount}
                onChange={(e) => {
                  if (isNaN(Number(e.target.value))) {
                    return;
                  }
                  setAmount(index, Number(e.target.value));
                }}
              />
            </div>
          );
        })}
      </form>
    </div>
  );
}
