import { GetStaticProps } from "next";
import Head from "next/head";
import BossListContainer from "components/boss/BossListContainer";
import { getPageTitle } from "utils/meta";
import { Boss, sendGetBossList } from "utils/ssrApi/boss";

interface Props {
  bossList: Boss[];
}

export default function BossListPage({ bossList }: Props) {
  return (
    <>
      <Head>
        <title>{getPageTitle("보스")}</title>
      </Head>
      <BossListContainer bossList={bossList} />;
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data } = await sendGetBossList();

  return {
    props: {
      bossList: data.data.content,
    },
    revalidate: 60 * 5, // 5 minute
  };
};
