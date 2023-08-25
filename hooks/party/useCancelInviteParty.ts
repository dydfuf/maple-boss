import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { CommonResponse } from "types/common";
import { customedAxios } from "hooks/api/customedAxios";

export default function useCancelInviteParty() {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { mutateAsync, isLoading } = useMutation(
    ["cancel-invite-party-member"],
    ({ partyInviteId }: Omit<APIParams, "accessToken">) =>
      sendCancelInviteParty({ partyInviteId, accessToken }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
        }
      },
    }
  );

  return {
    cancelInviteParty: mutateAsync,
    isLoading,
  };
}

interface APIParams {
  accessToken: string;
  partyInviteId: number;
}

const sendCancelInviteParty = ({ partyInviteId, accessToken }: APIParams) => {
  return customedAxios.post<CommonResponse<null>>(
    '/api/party-invite/cancel',
    { partyInviteId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
