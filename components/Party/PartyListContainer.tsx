import ContentTitle from "components/content/ContentTitle";
import ContentWrapper from "components/content/ContentWrapper";
import PartyListContent from "./PartyListContent";

export default function PartyListContainer() {
  return (
    <section className="flex w-full">
      <ContentWrapper>
        <ContentTitle title="파티"></ContentTitle>
        <PartyListContent />
      </ContentWrapper>
    </section>
  );
}
