import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

interface Params {
  partyId: number;
}

export default function useSettlementCount({ partyId }: Params) {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { data, isLoading } = useQuery(
    ["party-settlement", partyId],
    () => getSettlementCount({ accessToken, partyId }),
    {
      enabled: Boolean(accessToken) && Boolean(partyId),
    }
  );

  return { count: data?.data.data.count, isLoading };
}

interface GetSettlementCountParams {
  accessToken: string;
  partyId: number;
}

interface GetSettlementCountResponse {
  count: number;
}

const getSettlementCount = ({
  accessToken,
  partyId,
}: GetSettlementCountParams) => {
  return customedAxios.get<CommonResponse<GetSettlementCountResponse>>(
    `/api/party-settlement/get-count?partyId=${partyId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
