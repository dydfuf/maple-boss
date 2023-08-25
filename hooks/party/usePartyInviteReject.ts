import { useMutation } from "@tanstack/react-query";
import { customedAxios } from "hooks/api/customedAxios";
import { useSession } from "next-auth/react";
import { CommonResponse } from "types/common";

export default function usePartyInviteReject() {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { mutateAsync, isLoading } = useMutation(
    ["party-invite-reject"],
    ({ partyInviteId }: Omit<APIParams, "accessToken">) =>
      sendPartyInviteReject({ partyInviteId, accessToken }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
        }
      },
    }
  );

  return {
    partyInviteReject: mutateAsync,
    isLoading,
  };
}

interface APIParams {
  accessToken: string;
  partyInviteId: number;
}

const sendPartyInviteReject = ({ partyInviteId, accessToken }: APIParams) => {
  return customedAxios.post<CommonResponse<null>>(
    '/api/party-invite/reject',
    { partyInviteId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
