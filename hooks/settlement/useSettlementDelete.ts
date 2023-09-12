import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

interface Params {
  partySettlementId: number;
}

export default function useSettlementDelete({ partySettlementId }: Params) {
  const { data: sessionData } = useSession({ required: true });
  const accessToken = sessionData?.accessToken || "";

  const router = useRouter();
  const { partyId } = router.query;

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    ["settlement-delete", partySettlementId],
    () => sendSettlementDelete({ partySettlementId, accessToken }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
          return;
        }
        queryClient.invalidateQueries(["party-settlement-summary", partyId]);
        alert("삭제가 완료되었습니다.");
        router.push(`/settlement/${partyId}`);
      },
    }
  );

  return {
    settlementDelete: mutateAsync,
    isLoading,
  };
}

interface APIParams {
  accessToken: string;
  partySettlementId: number;
}

const sendSettlementDelete = ({
  partySettlementId,
  accessToken,
}: APIParams) => {
  return customedAxios.post<CommonResponse<null>>(
    "/api/party-settlement/delete",
    { partySettlementId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
