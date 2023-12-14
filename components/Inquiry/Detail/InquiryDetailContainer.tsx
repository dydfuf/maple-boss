import ContentTitle from "components/content/ContentTitle";
import ContentWrapper from "components/content/ContentWrapper";
import InquiryDetail from "./InquiryDetail";

export default function InquiryDetailContainer() {
  return (
    <section className="flex w-full">
      <ContentWrapper>
        <ContentTitle title="문의상세" />
        <InquiryDetail />
      </ContentWrapper>
    </section>
  );
}
