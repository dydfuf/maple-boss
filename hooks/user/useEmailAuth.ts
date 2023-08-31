import { useMutation } from "@tanstack/react-query";
import { customedAxios } from "hooks/api/customedAxios";

export default function useEmailAuth() {
  const { mutateAsync, isLoading } = useMutation(
    ["email-auth"],
    ({ email }: SendEmailParams) => sendEmail({ email }),
    {}
  );

  return {
    sendEmailAuth: mutateAsync,
    isLoading,
  };
}

interface SendEmailParams {
  email: string;
}

const sendEmail = ({ email }: SendEmailParams) => {
  return customedAxios.post("/api/email-auth", { email });
};
