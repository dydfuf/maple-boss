import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

interface Params {
  bossId: number;
}

export default function useBossItemList({ bossId }: Params) {
  const { data: sessionData } = useSession({ required: true });
  const accessToken = sessionData?.accessToken || "";

  const { data } = useQuery(
    ["search-boss-item", bossId],
    () => sendBossItemList({ accessToken, bossId }),
    {
      enabled: Boolean(accessToken) && Boolean(bossId),
    }
  );

  return {
    bossItemList: data?.data.data?.searchedList || [],
  };
}

interface APIParams {
  accessToken: string;
  bossId: number;
}

interface APIResponse {
  searchedList: SearchedBossItem[];
}

export interface SearchedBossItem {
  id: number;
  name: string;
}

const sendBossItemList = ({ accessToken, bossId }: APIParams) => {
  return customedAxios.get<CommonResponse<APIResponse>>(
    `/api/search/item?type=RANDOM&bossId=${bossId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
