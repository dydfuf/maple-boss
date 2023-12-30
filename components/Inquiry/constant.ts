import { Status, Type } from "hooks/inquiry/useGetInquiry";

export const TypeToNameMap: Record<Type, string> = {
  INQUIRY: "문의",
  TENDINOUS: "건의",
};
export const StatusToNameMap: Record<Status, string> = {
  COMPLETED: "완료",
  CREATED: "신청",
  IN_PROGRESS: "처리중",
};
