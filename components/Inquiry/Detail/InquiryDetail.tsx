import { useRouter } from "next/router";
import useGetInquiryDetail from "hooks/inquiry/useGetInquiryDetail";

export default function InquiryDetail() {
  const router = useRouter();
  const { inquiryId } = router.query;

  const { inquiryDetail } = useGetInquiryDetail({ id: Number(inquiryId) });

  return (
    <div className="p-12 text-gray-600">
      <p>content : {inquiryDetail?.content}</p>
    </div>
  );
}
