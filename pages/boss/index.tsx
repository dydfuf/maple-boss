import { GetStaticProps } from "next";
import BossListContainer from "components/boss/BossListContainer";
import { Boss, sendGetBossList } from "utils/ssrApi/boss";

interface Props {
  bossList: Boss[];
}

export default function BossListPage({ bossList }: Props) {
  return <BossListContainer bossList={bossList} />;
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
