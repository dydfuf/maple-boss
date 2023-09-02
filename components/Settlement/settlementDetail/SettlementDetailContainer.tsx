import ContentTitle from "components/content/ContentTitle";
import ContentWrapper from "components/content/ContentWrapper";
import SettlementDetailContent from "./SettlementDetailContent";
import SettlementDetailController from "./SettlementDetailController";

export default function SettlementDetailContainer() {
  return (
    <section className="flex w-full">
      <ContentWrapper>
        <ContentTitle title="정산 상세">
          <SettlementDetailController />
        </ContentTitle>
        <SettlementDetailContent />
      </ContentWrapper>
    </section>
  );
}
