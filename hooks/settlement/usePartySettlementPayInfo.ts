import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

interface Params {
  partyId: number;
}

export default function usePartySettlementPayInfo({ partyId }: Params) {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { data, isLoading } = useQuery(
    ["party-settlement-pay-info", partyId],
    () => sendPartySettlementPayInfo({ accessToken, partyId }),
    {
      enabled: Boolean(accessToken) && Boolean(partyId),
    }
  );

  return {
    payInfo: data?.data.data,
    isLoading,
  };
}

interface APIParams {
  partyId: number;
  accessToken: string;
}

interface APIResponse {
  count: number;
  totalMeso: number;
  sumMeso: number;
  userPayInfo: Record<string, number>;
}

const sendPartySettlementPayInfo = ({ accessToken, partyId }: APIParams) => {
  return customedAxios.get<CommonResponse<APIResponse>>(
    `/api/party-settlement/pay-info?partyId=${partyId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
