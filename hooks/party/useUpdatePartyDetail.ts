import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

interface Params {
  partyId: number;
}

export default function useUpdatePartyDetail({ partyId }: Params) {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { mutateAsync, isLoading } = useMutation(
    ["update-party-detail", partyId],
    ({ name, description }: Omit<APIParams, "accessToken" | "partyId">) =>
      sendUpdatePartyDetail({ name, description, accessToken, partyId }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
        }
      },
    }
  );

  return {
    updateParty: mutateAsync,
    isLoading,
  };
}

interface APIParams {
  partyId: number;
  accessToken: string;
  name: string;
  description: string;
}

const sendUpdatePartyDetail = ({
  partyId,
  name,
  description,
  accessToken,
}: APIParams) => {
  return customedAxios.post<CommonResponse<null>>(
    "/api/party/update",
    { name, description, partyId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
