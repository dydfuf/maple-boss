import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import BossDetailContainer from "components/boss/detail/BossDetailContainer";
import { getPageTitle } from "utils/meta";
import { sendGetBossList } from "utils/ssrApi/boss";
import { Boss, Item, sendGetBossDetail } from "utils/ssrApi/bossDetail";

interface Props {
  boss: Boss;
  items: Item[];
}

export default function BossDetailPage({ boss, items }: Props) {
  return (
    <>
      <Head>
        <title>{getPageTitle(`${boss.name}(${boss.clazz})`)}</title>
      </Head>
      <BossDetailContainer boss={boss} items={items} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await sendGetBossList();
  const bossList = data.data.content;

  const paths = bossList.map((boss) => ({
    params: { bossId: String(boss.id) },
  }));

  return { paths, fallback: "blocking" };
};

interface Params extends ParsedUrlQuery {
  bossId: string;
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const { bossId } = ctx.params as Params;

  const { data } = await sendGetBossDetail({ bossId: Number(bossId) });

  return {
    props: {
      boss: data.data.boss,
      items: data.data.items,
    },
    revalidate: 60 * 5, // 5 minute
  };
};
