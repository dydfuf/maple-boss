import AdSenseWrapper from "components/common/AdSense/AdSenseWrapper";
import PartySettlementTab from "components/common/PartySettlementTab";
import ContentWrapper from "components/content/ContentWrapper";
import PartyListContent from "../List/PartyListContent";
import PartySettlementBackground from "@/public/images/PartySettlementBackground.png";

export default function PartyListContainer() {
  return (
    <section className="flex w-full flex-col items-center">
      <img
        src={PartySettlementBackground.src}
        className="absolute h-402 w-full"
        alt=""
      />
      <PartySettlementTab activeTab="PARTY" />
      <div className="z-10 mt-60">
        <AdSenseWrapper>
          <ContentWrapper>
            <PartyListContent />
          </ContentWrapper>
        </AdSenseWrapper>
      </div>
    </section>
  );
}
