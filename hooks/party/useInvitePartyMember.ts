import { useMutation } from "@tanstack/react-query";
import { customedAxios } from "hooks/api/customedAxios";
import { useSession } from "next-auth/react";
import { CommonResponse } from "types/common";

interface Params {
  partyId: number;
}

export default function useInvitePartyMember({ partyId }: Params) {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { mutateAsync, isLoading } = useMutation(
    ["invite-party-member", partyId],
    ({ email }: Omit<APIParams, "accessToken" | "partyId">) =>
      sendCreateParty({ email, partyId, accessToken }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
        }
      },
    }
  );

  return {
    inviteMember: mutateAsync,
    isLoading,
  };
}

interface APIParams {
  accessToken: string;
  email: string;
  partyId: number;
}

const sendCreateParty = ({ email, partyId, accessToken }: APIParams) => {
  return customedAxios.post<CommonResponse<null>>(
    '/api/party-invite',
    { email, partyId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
