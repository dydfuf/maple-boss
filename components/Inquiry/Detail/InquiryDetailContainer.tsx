import { format } from "date-fns";
import { useRouter } from "next/router";
import ContentTitle from "components/content/ContentTitle";
import ContentWrapper from "components/content/ContentWrapper";
import { Type } from "hooks/inquiry/useGetInquiry";
import useGetInquiryDetail from "hooks/inquiry/useGetInquiryDetail";
import InquiryDetail from "./InquiryDetail";
import InquiryDetailSubTitle from "./InquiryDetailSubTitle";
import { TypeToNameMap } from "../constant";

export default function InquiryDetailContainer() {
  const router = useRouter();
  const { inquiryId } = router.query;

  const { inquiryDetail } = useGetInquiryDetail({ id: Number(inquiryId) });
  const { title, createdAt } = inquiryDetail || {
    title: "",
    createdAt: "",
  };
  const type = TypeToNameMap[inquiryDetail?.type as Type] || "";

  let date = "";
  try {
    date = format(new Date(createdAt), "yyyy-MM-dd HH:MM");
  } catch (e) {}

  return (
    <section className="flex w-full">
      <ContentWrapper>
        <ContentTitle
          title={`${type ? `[${type}]` : ""} ${title}`}
          variant="detail"
        >
          <InquiryDetailSubTitle author="작성자" date={date} viewCount={0} />
        </ContentTitle>
        <InquiryDetail />
      </ContentWrapper>
    </section>
  );
}
