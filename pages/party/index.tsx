import Head from "next/head";
import PartyListContainer from "components/Party/List/PartyListContainer";
import { getPageTitle } from "utils/meta";

export default function PartyListPage() {
  return (
    <>
      <Head>
        <title>{getPageTitle("파티")}</title>
      </Head>
      <PartyListContainer />
    </>
  );
}
