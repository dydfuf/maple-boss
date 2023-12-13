import axios from "axios";

export const sendRankingHTML = ({
  page = 1,
  world = 0,
}: {
  page?: number;
  world?: number;
}) => {
  return axios.get(
    `https://maplestory.nexon.com/N23Ranking/Contents/Dojang/ThisWeek?t=2&page=${page}&w=${world}`
  );
};
