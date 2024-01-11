import ContentTitle from "components/content/ContentTitle";
import ContentWrapper from "components/content/ContentWrapper";
import InquiryCreateButton from "./InquiryCreateButton";
import InquiryListTable from "./InquiryListTable";

export default function InquiryContainer() {
  return (
    <section className="flex w-full">
      <ContentWrapper>
        <ContentTitle title="문의 게시판" />
        <InquiryCreateButton />
        <InquiryListTable />
      </ContentWrapper>
    </section>
  );
}
