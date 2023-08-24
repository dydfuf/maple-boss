import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_HOST } from "constants/common";
import { CommonResponse } from "types/common";

export default function useEmailAuthValidate() {
  const { mutateAsync, isLoading } = useMutation(
    ["email-auth"],
    ({ email, code }: EmailAuthValidateParams) =>
      emailAuthValidate({ email, code }),
    {}
  );

  return {
    emailAuthValidate: mutateAsync,
    isLoading,
  };
}

interface EmailAuthValidateParams {
  email: string;
  code: string;
}

interface EmailAuthValidateResponse {
  valid: boolean;
}

const emailAuthValidate = ({ email, code }: EmailAuthValidateParams) => {
  return axios.post<CommonResponse<EmailAuthValidateResponse>>(
    `${API_HOST}/api/email-auth/validate`,
    { email, code }
  );
};
