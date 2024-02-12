import AdSenseWrapper from "components/common/AdSense/AdSenseWrapper";
import ContentWrapper from "components/content/ContentWrapper";
import PartyDetailTopInfo from "./Detail/PartyDetailTopInfo";
import PartyDetailContent from "./PartyDetailContent";
import PartySettlementBackground from "@/public/images/PartySettlementBackground.png";

export default function PartyDetailContainer() {
  return (
    <section className="flex w-full flex-col items-center">
      <img
        src={PartySettlementBackground.src}
        className="absolute h-402 w-full"
        alt=""
      />
      <PartyDetailTopInfo />
      <div className="z-10 mt-60">
        <AdSenseWrapper>
          <ContentWrapper>
            <PartyDetailContent />
          </ContentWrapper>
        </AdSenseWrapper>
      </div>
    </section>
  );
}
