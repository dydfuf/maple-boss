import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

interface Params {
  searchValue: string;
}

export default function useSearchBoss({ searchValue }: Params) {
  const { data: sessionData } = useSession({ required: true });
  const accessToken = sessionData?.accessToken || "";

  const debouncedValue = useDebounce(searchValue, 1000);

  const { data } = useQuery(
    ["search-boss", debouncedValue],
    () => sendSearchBoss({ searchValue: debouncedValue, accessToken }),
    {
      enabled: Boolean(debouncedValue),
    }
  );

  return {
    searchedBossList: data?.data.data.searchedList || [],
  };
}

interface APIParams {
  searchValue: string;
  accessToken: string;
}

interface APIResponse {
  searchedList: SearchedBoss[];
}

export interface SearchedBoss {
  id: number;
  name: string;
}

const sendSearchBoss = ({ searchValue, accessToken }: APIParams) => {
  return customedAxios.get<CommonResponse<APIResponse>>(
    `/api/search/boss?keyword=${searchValue}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
