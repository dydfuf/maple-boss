import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";
import { useRouter } from "next/router";

interface Params {
  partyId: number;
}

export default function useLeaveParty({ partyId }: Params) {
  const router = useRouter();

  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { mutateAsync, isLoading } = useMutation(
    ["update-party-detail"],
    () => sendLeaveParty({ accessToken, partyId }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
        }
        alert("파티에서 탈퇴했습니다.");
        const currentUrlArr = window.location.href.split("/");
        currentUrlArr.length = 4;
        router.push(currentUrlArr.join("/"));
      },
    }
  );

  return {
    leaveParty: mutateAsync,
    isLoading,
  };
}

interface APIParams {
  partyId: number;
  accessToken: string;
}

const sendLeaveParty = ({ partyId, accessToken }: APIParams) => {
  return customedAxios.post<CommonResponse<null>>(
    "/api/party/leave-member",
    { partyId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
