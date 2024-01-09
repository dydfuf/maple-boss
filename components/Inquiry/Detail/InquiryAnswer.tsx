import { format } from "date-fns";
import { useRouter } from "next/router";
import useGetInquiryDetail from "hooks/inquiry/useGetInquiryDetail";

export default function InquiryAnswer() {
  const router = useRouter();
  const { inquiryId } = router.query;

  const { inquiryDetail } = useGetInquiryDetail({ id: Number(inquiryId) });

  let answeredDate;
  try {
    answeredDate = format(
      new Date(inquiryDetail?.completedAt ?? ""),
      "( yyyy-MM-dd )"
    );
  } catch (e) {}

  if (!inquiryDetail?.answer) return null;

  return (
    <div className="mt-auto w-full text-black">
      <p className="my-12 text-24 font-bold">답변</p>
      <div className="border-y-1 px-8 py-20">
        <p className="text-20 font-bold">
          관리자{" "}
          <span className="text-14 font-normal text-gray-500">
            {answeredDate}
          </span>
        </p>
        <p className="mt-20">{inquiryDetail?.answer}</p>
      </div>
    </div>
  );
}
