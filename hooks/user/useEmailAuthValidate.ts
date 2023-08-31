import { useMutation } from "@tanstack/react-query";
import { customedAxios } from "hooks/api/customedAxios";
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
  return customedAxios.post<CommonResponse<EmailAuthValidateResponse>>(
    "/api/email-auth/validate",
    { email, code }
  );
};
