import { range } from "lodash-es";
import { GetServerSidePropsContext } from "next";

export default function Ranking() {
  return <></>;
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const { ranking } = ctx.query;
  const [_world, _page, _rest] = (ranking as string[]) || [];

  const world = Number(_world);
  const page = Number(_page);

  const worldRange = range(15);
  const pageRange = range(1, 1000);

  const nextWorldNum = isNaN(world) || !worldRange.includes(world) ? 0 : world;
  const nextPageNum = isNaN(page) || !pageRange.includes(page) ? 1 : page;

  return {
    redirect: {
      destination: `/ranking/${nextWorldNum}/${nextPageNum}`,
      permanent: false,
    },
  };
};
