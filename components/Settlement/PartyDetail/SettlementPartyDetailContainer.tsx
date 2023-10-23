import ContentTitle from "components/content/ContentTitle";
import ContentWrapper from "components/content/ContentWrapper";
import SettlementPartyDetailContent from "./SettlementPartyDetailContent";
import SettlementPartyDetailController from "./SettlementPartyDetailController";

export default function SettlementPartyDetailContainer() {
  return (
    <section className="flex w-full">
      <ContentWrapper>
        <ContentTitle title="정산 요약">
          <SettlementPartyDetailController />
        </ContentTitle>
        <SettlementPartyDetailContent />
      </ContentWrapper>
    </section>
  );
}
