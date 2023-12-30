import Head from "next/head";
import SettlementContainer from "components/Settlement/SettlementContainer";
import { getPageTitle } from "utils/meta";

export default function SettlementPage() {
  return (
    <>
      <Head>
        <title>{getPageTitle("정산")}</title>
      </Head>
      <SettlementContainer />
    </>
  );
}
