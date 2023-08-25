import { useMutation } from "@tanstack/react-query";
import { customedAxios } from "hooks/api/customedAxios";
import { useSession } from "next-auth/react";
import { CommonResponse } from "types/common";

export default function useChangeNickname() {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { mutateAsync, isLoading } = useMutation(
    ["change-nickname"],
    ({ nickname }: Omit<APIParams, "accessToken">) =>
      snedChangeNickname({ nickname, accessToken }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
        }
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
    '/api/user/change-nickname',
    { nickname },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
