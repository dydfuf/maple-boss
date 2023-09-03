import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

interface Params {
  partyId: number;
}

export default function usePartySettlementPay({ partyId }: Params) {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { mutateAsync, isLoading } = useMutation(
    ["party-settlement-pay", partyId],
    () => sendPartySettlementPay({ partyId, accessToken }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
        }
        alert("지급 완료!");
      },
    }
  );

  return {
    partySettlementPay: mutateAsync,
    isLoading,
  };
}

interface APIParams {
  accessToken: string;
  partyId: number;
}

const sendPartySettlementPay = ({ partyId, accessToken }: APIParams) => {
  return customedAxios.post<CommonResponse<null>>(
    "/api/party-settlement/pay",
    { partyId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
