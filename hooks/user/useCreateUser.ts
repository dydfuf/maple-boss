import { useMutation } from "@tanstack/react-query";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

export default function useCreateUser() {
  const { mutateAsync, isLoading } = useMutation(
    ["create-user"],
    ({ email }: SendCreateUserParams) => sendCreateUser({ email }),
    {
      onSuccess: () => {
        // TODO: data.code 에 따른 분기처리
      },
    }
  );

  return {
    createUser: mutateAsync,
    isLoading,
  };
}

interface SendCreateUserResponse {
  id: number;
  nickname: string;
  email: string;
  status: string;
}

interface SendCreateUserParams {
  email: string;
}

const sendCreateUser = ({ email }: SendCreateUserParams) => {
  return customedAxios.post<CommonResponse<SendCreateUserResponse>>(
    '/api/user',
    { email }
  );
};
