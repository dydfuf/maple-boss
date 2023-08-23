import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_HOST } from "constants/common";

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
  return axios.post(`${API_HOST}/api/email-auth`, { email });
};
