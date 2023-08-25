import { useMutation } from "@tanstack/react-query";
import { customedAxios } from "hooks/api/customedAxios";
import { signOut, useSession } from "next-auth/react";
import { CommonResponse } from "types/common";

export default function useChangePassword() {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { mutateAsync, isLoading } = useMutation(
    ["change-password"],
    ({ password }: Omit<APIParams, "accessToken">) =>
      sendChangePassword({ password, accessToken }),
    {
      onSuccess: (data) => {
        if (data?.data.code !== "S000") {
          alert(data?.data.message);
          return;
        }
        alert("비밀번호 변경이 완료되었습니다. 다시 로그인해 주세요");
        signOut();
      },
    }
  );

  return {
    changePassword: mutateAsync,
    isLoading,
  };
}

interface APIParams {
  accessToken: string;
  password: string;
}

const sendChangePassword = ({ password, accessToken }: APIParams) => {
  return customedAxios.post<CommonResponse<null>>(
    '/api/user/change-password',
    { password },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
