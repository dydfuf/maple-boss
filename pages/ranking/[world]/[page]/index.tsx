import { range } from "@toss/utils";
import { format } from "date-fns";
import { GetStaticProps } from "next";
import Head from "next/head";
import { parse } from "node-html-parser";
import React from "react";
import { ParsedUrlQuery } from "querystring";
import RankingContainer from "components/Ranking/RankingContainer";
import { getPageTitle } from "utils/meta";
import { sendRankingHTML } from "utils/ssrApi/mapleRanking";

interface Props {
  rankList: Rank[];
  nowDate: string;
}

export default function RankingPage(props: Props) {
  return (
    <>
      <Head>
        <title>{getPageTitle("랭킹")}</title>
      </Head>
      <RankingContainer {...props} />
    </>
  );
}
export async function getStaticPaths() {
  const worldRange = range(15);
  const pageRange = range(1, 10);

  const paths = worldRange.flatMap((worldNum) =>
    pageRange.map((pageNum) => ({
      params: {
        world: String(worldNum),
        page: String(pageNum),
      },
    }))
  );

  return { paths, fallback: true };
}

interface Params extends ParsedUrlQuery {
  world: string;
  page: string;
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { world, page } = params as Params;

  const { data } = await sendRankingHTML({
    world: Number(world),
    page: Number(page),
  });

  const root = parse(data);
  const rankBody = root
    .querySelector(".rank_table")
    ?.getElementsByTagName("tbody")[0];
  const rankList: Rank[] = [];

  const rankRow = rankBody?.getElementsByTagName("tr");

  rankRow?.forEach((row, index) => {
    const rank =
      row.querySelector("p")?.textContent.trim() || String(index + 1);
    const imageSrc =
      row.querySelector(".left > .char_img > img")?.getAttribute("src") || "";
    const characterName =
      row.querySelector(".left > dl > dt > a")?.innerText || "";
    const worldImageSrc =
      row.querySelector(".left > dl > dt > a > img")?.getAttribute("src") || "";
    const chracterClass = row.querySelector(".left > dl > dd")?.innerText || "";
    const level = row.querySelector("td:nth-of-type(3)")?.innerText || "";
    const floor = row.querySelector("td:nth-of-type(4)")?.innerText || "";
    const record = row.querySelector("td:nth-of-type(5)")?.innerText || "";

    const rankData: Rank = {
      rank: Number(rank),
      imageSrc,
      characterName,
      worldImageSrc,
      chracterClass,
      level,
      floor,
      record,
    };
    rankList.push(rankData);
  });

  const nowDate = format(new Date(), "yyyy-MM-dd");

  return {
    props: {
      rankList,
      nowDate,
    },
    revalidate: 60 * 60 * 24, // 1 day
  };
};

export interface Rank {
  rank: number;
  imageSrc: string;
  characterName: string;
  worldImageSrc: string;
  chracterClass: string;
  level: string;
  floor: string;
  record: string;
}
