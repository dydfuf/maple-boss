import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

interface Params {
  partyId: number;
}

export default function useKickOutMember({ partyId }: Params) {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { mutateAsync, isLoading } = useMutation(
    ["kick-out-member", partyId],
    ({ memberId }: Omit<APIParams, "accessToken" | "partyId">) =>
      sendKickOutMember({ memberId, partyId, accessToken }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
        }
      },
    }
  );

  return {
    kickOutMember: mutateAsync,
    isLoading,
  };
}

interface APIParams {
  accessToken: string;
  memberId: number;
  partyId: number;
}

const sendKickOutMember = ({ memberId, partyId, accessToken }: APIParams) => {
  return customedAxios.post<CommonResponse<null>>(
    "/api/party/kick-member",
    { memberId, partyId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
