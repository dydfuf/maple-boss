import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

interface Params {
  partySettlementId: number;
}

export default function useSettlementConfirm({ partySettlementId }: Params) {
  const { data: sessionData } = useSession({ required: true });
  const accessToken = sessionData?.accessToken || "";

  const router = useRouter();
  const { partyId } = router.query;

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    ["settlement-confirm", partySettlementId],
    () => sendSettlementConfirm({ partySettlementId, accessToken }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
          return;
        }
        queryClient.invalidateQueries(["party-settlement-summary", partyId]);
        alert("해당 정산이 확정되었습니다.");
        router.push(`/settlement/${partyId}`);
      },
    }
  );

  return {
    settlementConfirm: mutateAsync,
    isLoading,
  };
}

interface APIParams {
  accessToken: string;
  partySettlementId: number;
}

const sendSettlementConfirm = ({
  partySettlementId,
  accessToken,
}: APIParams) => {
  return customedAxios.post<CommonResponse<null>>(
    "/api/party-settlement/confirm",
    { partySettlementId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
