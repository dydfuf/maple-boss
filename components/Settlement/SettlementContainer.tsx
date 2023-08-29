import ContentTitle from "components/content/ContentTitle";
import ContentWrapper from "components/content/ContentWrapper";
import SettlementListContent from "./SettlementListContent";

export default function SettlementContainer() {
  return (
    <section className="flex w-full">
      <ContentWrapper>
        <ContentTitle title="정산"></ContentTitle>
        <SettlementListContent />
      </ContentWrapper>
    </section>
  );
}
