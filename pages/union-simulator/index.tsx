import Head from "next/head";
import UnionSimulatorContainer from "components/UnionSimulator/UnionSimulatorContainer";
import { getPageTitle } from "utils/meta";

export default function UnionSimulatorPage() {
  return (
    <>
      <Head>
        <title>{getPageTitle("유니온 계산기")}</title>
      </Head>
      <UnionSimulatorContainer />
    </>
  );
}
