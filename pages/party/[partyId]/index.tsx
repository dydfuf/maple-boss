import Head from "next/head";
import PartyDetailContainer from "components/Party/PartyDetailContainer";
import { getPageTitle } from "utils/meta";

export default function PartyDetailPage() {
  return (
    <>
      <Head>
        <title>{getPageTitle("파티 상세")}</title>
      </Head>
      <PartyDetailContainer />;
    </>
  );
}
