import Head from "next/head";
import SettlementDetailContainer from "components/Settlement/settlementDetail/SettlementDetailContainer";
import { getPageTitle } from "utils/meta";

export default function SettlementPartyDetailPage() {
  return (
    <>
      <Head>
        <title>{getPageTitle("정산 상세")}</title>
      </Head>
      <SettlementDetailContainer />;
    </>
  );
}
