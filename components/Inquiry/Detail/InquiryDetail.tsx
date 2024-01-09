import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useGetInquiryDetail from "hooks/inquiry/useGetInquiryDetail";

const ToastViewer = dynamic(() => import("components/common/Viewer"), {
  ssr: false,
});

export default function InquiryDetail() {
  const router = useRouter();
  const { inquiryId } = router.query;

  const { inquiryDetail } = useGetInquiryDetail({ id: Number(inquiryId) });
  return (
    <div className="h-full p-12 text-gray-600">
      {inquiryDetail?.content && (
        <ToastViewer contents={inquiryDetail.content} />
      )}
    </div>
  );
}
