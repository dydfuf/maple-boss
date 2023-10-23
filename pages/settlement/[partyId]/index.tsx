import Head from "next/head";
import SettlementPartyDetailContainer from "components/Settlement/PartyDetail/SettlementPartyDetailContainer";
import { getPageTitle } from "utils/meta";

export default function SettlementPartyDetailPage() {
  return (
    <>
      <Head>
        <title>{getPageTitle("정산 요약")}</title>
      </Head>
      <SettlementPartyDetailContainer />
    </>
  );
}
