import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";
import { Status, Type } from "./useGetInquiry";

interface Params {
  id: number;
}

export default function useGetInquiryDetail({ id }: Params) {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { data, isLoading } = useQuery(
    ["inquiry-detail", id],
    () => getInquiryDetail({ accessToken, id }),
    {
      enabled: Boolean(accessToken) && Boolean(id),
    }
  );

  return { inquiryDetail: data?.data.data, isLoading };
}

interface APIParams {
  accessToken: string;
  id: number;
}

interface APIResponse {
  id: number;
  title: string;
  content: string;
  type: Type;
  status: Status;
  //TODO
  answer: string;
}

const getInquiryDetail = ({ accessToken, id }: APIParams) => {
  return customedAxios.get<CommonResponse<APIResponse>>(`/api/inquiry/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
