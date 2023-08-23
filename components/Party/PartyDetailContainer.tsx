import ContentTitle from "components/content/ContentTitle";
import ContentWrapper from "components/content/ContentWrapper";
import PartyController from "./Detail/PartyController";
import PartyDetailContent from "./PartyDetailContent";

export default function PartyDetailContainer() {
  return (
    <section className="flex w-full">
      <ContentWrapper>
        <ContentTitle title="파티 상세">
          <PartyController />
        </ContentTitle>
        <PartyDetailContent />
      </ContentWrapper>
    </section>
  );
}
