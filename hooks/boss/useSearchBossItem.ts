import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

interface Params {
  searchValue: string;
  bossId: number;
}

export default function useSearchBossItem({ searchValue, bossId }: Params) {
  const { data: sessionData } = useSession({ required: true });
  const accessToken = sessionData?.accessToken || "";

  const debouncedValue = useDebounce(searchValue, 1000);

  const { data } = useQuery(
    ["search-boss-item", debouncedValue, bossId],
    () =>
      sendSearchBossItem({ searchValue: debouncedValue, bossId, accessToken }),
    {
      enabled: Boolean(debouncedValue) && Boolean(bossId),
    }
  );

  return {
    searchedBossItemList: data?.data.data.searchedList || [],
  };
}

interface APIParams {
  searchValue: string;
  bossId: number;
  accessToken: string;
}

interface APIResponse {
  searchedList: SearchedBossItem[];
}

export interface SearchedBossItem {
  id: number;
  name: string;
}

const sendSearchBossItem = ({
  searchValue,
  bossId,
  accessToken,
}: APIParams) => {
  return customedAxios.get<CommonResponse<APIResponse>>(
    `/api/search/item?keyword=${searchValue}&bossId=${bossId}&type=RANDOM`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
