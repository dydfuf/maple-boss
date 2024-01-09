import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useGetInquiryDetail from "hooks/inquiry/useGetInquiryDetail";
import InquiryAnswer from "./InquiryAnswer";

const ToastViewer = dynamic(() => import("components/common/Viewer"), {
  ssr: false,
});

export default function InquiryDetail() {
  const router = useRouter();
  const { inquiryId } = router.query;

  const { inquiryDetail } = useGetInquiryDetail({ id: Number(inquiryId) });
  return (
    <div className="flex h-full flex-col p-12 text-gray-600">
      {inquiryDetail?.content && (
        <div className="flex h-full w-full flex-col">
          <ToastViewer contents={inquiryDetail.content} />
          <InquiryAnswer />
        </div>
      )}
    </div>
  );
}
