import { useRouter } from "next/router";
import useGetInquiryDetail from "hooks/inquiry/useGetInquiryDetail";

export default function InquiryDetail() {
  const router = useRouter();
  const { inquiryId } = router.query;

  const { inquiryDetail } = useGetInquiryDetail({ id: Number(inquiryId) });

  return (
    <div>
      <p>title : {inquiryDetail?.title}</p>
      <p>type : {inquiryDetail?.type}</p>
      <p>content : {inquiryDetail?.content}</p>
      <p>answer : {inquiryDetail?.answer}</p>
      <p>status : {inquiryDetail?.status}</p>
    </div>
  );
}
