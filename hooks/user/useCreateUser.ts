import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_HOST } from "constants/common";

export default function useCreateUser() {
  const { mutateAsync, isLoading } = useMutation(
    ["create-user"],
    ({ email }: SendCreateUserParams) => sendCreateUser({ email }),
    {
      onSuccess: (data) => {
        if (data?.data.error) {
          alert(data?.data.error.message);
        }
      },
    }
  );

  return {
    createUser: mutateAsync,
    isLoading,
  };
}

interface SendCreateUserResponse {
  error?: {
    message: string;
  };
  user?: {
    id: number;
    nickname: string;
    email: string;
    status: string;
  };
}

interface SendCreateUserParams {
  email: string;
}

const sendCreateUser = ({ email }: SendCreateUserParams) => {
  return axios.post<SendCreateUserResponse>(`${API_HOST}/api/user`, { email });
};
