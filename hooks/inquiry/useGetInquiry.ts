import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { customedAxios } from "hooks/api/customedAxios";
import { CommonResponse } from "types/common";

export default function useGetInquiry() {
  const { data: sessionData } = useSession({ required: true });

  const accessToken = sessionData?.accessToken || "";

  const { data, isLoading } = useQuery(
    ["inquiry"],
    () => getInquiryList({ accessToken }),
    {
      enabled: Boolean(accessToken),
    }
  );

  return { inquiryList: data?.data.data.content || [], isLoading };
}

interface GetInquiryListParams {
  accessToken: string;
}

interface GetInquiryListResponse {
  content: Inquiry[];
}

interface Inquiry {
  id: number;
  title: string;
  type: Type;
  status: Status;
}

const getInquiryList = ({ accessToken }: GetInquiryListParams) => {
  return customedAxios.get<CommonResponse<GetInquiryListResponse>>(
    "/api/inquiry",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export type Type = "TENDINOUS" | "INQUIRY";
export type Status = "CREATED" | "IN_PROGRESS" | "COMPLETED";
