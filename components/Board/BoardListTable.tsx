import { format } from "date-fns";
import { useRouter } from "next/router";
import useGetBoard from "hooks/board/useGetBoard";

export default function BoardListTable() {
  const { boardList } = useGetBoard();

  const router = useRouter();

  const onRowClick = (id: number) => {
    router.push(`/board/${id}/detail`);
  };

  return (
    <table className="mt-20 w-full table-fixed">
      <colgroup>
        <col width={"10%"} />
        <col width={"10%"} />
        <col width={"40%"} />
        <col width={"10%"} />
        <col width={"20%"} />
        <col width={"10%"} />
      </colgroup>
      <thead className="border-1 bg-gray-300">
        <tr className="text-20 font-bold">
          <th className="p-8">번호</th>
          <th className="p-8">타입</th>
          <th className="p-8">제목</th>
          <th className="p-8">등록자</th>
          <th className="p-8">등록일</th>
          <th className="p-8">조회</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {boardList?.map((board) => (
          <tr
            key={board.id}
            className="cursor-pointer border-b-1 last:border-b-0 even:bg-gray-100"
            onClick={() => {
              onRowClick(board.id);
            }}
          >
            <td className="p-12 font-bold">{board.id}</td>
            <td>{board.category}</td>
            <td>{board.title}</td>
            <td>{board.nickname}</td>
            <td>{format(new Date(board.createdAt), "yyyy-MM-dd HH:MM")}</td>
            <td>{board.views}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
