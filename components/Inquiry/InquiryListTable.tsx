import { format } from "date-fns";
import { useRouter } from "next/router";
import useGetInquiry from "hooks/inquiry/useGetInquiry";
import { StatusToNameMap, TypeToNameMap } from "./constant";

export default function InquiryListTable() {
  const { inquiryList } = useGetInquiry();

  const router = useRouter();

  const onRowClick = (id: number) => {
    router.push(`/inquiry/${id}/detail`);
  };

  return (
    <table className="mt-20 w-full table-fixed">
      <colgroup>
        <col width={"10%"} />
        <col width={"15%"} />
        <col width={"40%"} />
        <col width={"15%"} />
        <col width={"20%"} />
      </colgroup>
      <thead className="border-1 bg-gray-300">
        <tr className="text-20 font-bold">
          <th className="p-8">번호</th>
          <th className="p-8">타입</th>
          <th className="p-8">제목</th>
          <th className="p-8">등록일</th>
          <th className="p-8">상태</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {inquiryList?.map((inquiry) => (
          <tr
            key={inquiry.id}
            className="cursor-pointer border-b-1 last:border-b-0 even:bg-gray-100"
            onClick={() => {
              onRowClick(inquiry.id);
            }}
          >
            <td className="p-12 font-bold">{inquiry.id}</td>
            <td>{TypeToNameMap[inquiry.type]}</td>
            <td>{inquiry.title}</td>
            <td>{format(new Date(inquiry.createdAt), "yyyy-MM-dd HH:MM")}</td>
            <td>{StatusToNameMap[inquiry.status]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
