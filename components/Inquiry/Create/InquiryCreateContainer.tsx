import ContentTitle from "components/content/ContentTitle";
import ContentWrapper from "components/content/ContentWrapper";
import InquiryCreateForm from "./InquiryCreateForm";

export default function InquiryCreateContainer() {
  return (
    <section className="flex w-full">
      <ContentWrapper isFixed>
        <ContentTitle title="문의생성" />
        <InquiryCreateForm />
      </ContentWrapper>
    </section>
  );
}
