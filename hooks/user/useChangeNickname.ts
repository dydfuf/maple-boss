import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

export default function useChangeNickname() {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    ["change-nickname"],
    ({ nickname }: Omit<APIParams, "accessToken">) =>
      snedChangeNickname({ nickname, accessToken }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
        }
        queryClient.invalidateQueries(["party"]);
        queryClient.invalidateQueries(["my-info"]);
      },
    }
  );

  return {
    changeNickname: mutateAsync,
    isLoading,
  };
}

interface APIParams {
  accessToken: string;
  nickname: string;
}

const snedChangeNickname = ({ nickname, accessToken }: APIParams) => {
  return customedAxios.post<CommonResponse<null>>(
    "/api/user/change-nickname",
    { nickname },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
