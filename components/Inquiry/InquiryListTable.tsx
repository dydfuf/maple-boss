import { useRouter } from "next/router";
import useGetInquiry, { Status, Type } from "hooks/inquiry/useGetInquiry";

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
        <col width={"20%"} />
        <col width={"50%"} />
        <col width={"20%"} />
      </colgroup>
      <thead className="border-1 bg-gray-300">
        <tr className="text-20 font-bold">
          <th className="p-8">번호</th>
          <th className="p-8">타입</th>
          <th className="p-8">제목</th>
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
            <td>{StatusToNameMap[inquiry.status]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const TypeToNameMap: Record<Type, string> = {
  INQUIRY: "문의",
  TENDINOUS: "건의",
};
const StatusToNameMap: Record<Status, string> = {
  COMPLETED: "완료",
  CREATED: "신청",
  IN_PROGRESS: "처리중",
};
