import { Rank } from "pages/ranking/[world]/[page]";

interface Props {
  rankList: Rank[];
  nowDate: string;
}

export default function RankingListTable({ rankList, nowDate }: Props) {
  return (
    <div className="mt-40 flex flex-col items-center justify-center">
      <p className="ml-auto mr-12 text-12 text-gray-500">{`${nowDate} 기준 랭킹`}</p>
      <table className="mt-8 w-full table-fixed">
        <colgroup>
          <col width={"10%"} />
          <col width={"35%"} />
          <col width={"20%"} />
          <col width={"10%"} />
          <col width={"20%"} />
        </colgroup>
        <thead className="border-1 bg-gray-100">
          <tr className="text-20 font-bold">
            <th className="p-8">순위</th>
            <th className="p-8">캐릭터정보</th>
            <th className="p-8">레벨</th>
            <th className="p-8">구간</th>
            <th className="p-8">기록</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {rankList?.map((rank) => (
            <tr key={rank.rank} className="border-b-1 last:border-b-0">
              <td className="text-24 font-bold">{rank.rank}</td>
              <td>
                <div className="flex flex-col items-center sm:flex-row">
                  <img
                    src={rank.imageSrc}
                    width={160}
                    height={160}
                    alt={rank.characterName}
                  />
                  <div className="ml-8 flex flex-col items-start justify-center">
                    <span>{rank.characterName}</span>
                    <span>{rank.chracterClass}</span>
                  </div>
                </div>
              </td>
              <td>{rank.level}</td>
              <td>{rank.floor}</td>
              <td>{rank.record}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
