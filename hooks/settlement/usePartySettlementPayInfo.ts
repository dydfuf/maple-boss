import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { API_STATUS_CODE } from "constants/common";
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

  const isNotFound = data?.data.code === API_STATUS_CODE.NOT_FOUND;

  return {
    payInfo: data?.data.data,
    isLoading,
    isNotFound,
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
  isLeader: boolean;
}

const sendPartySettlementPayInfo = ({ accessToken, partyId }: APIParams) => {
  return customedAxios.get<CommonResponse<APIResponse | null>>(
    `/api/party-settlement/pay-info?partyId=${partyId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
