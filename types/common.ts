export interface CommonResponse<T> {
  code: string;
  message: string;
  data: T;
}

export type SettlementType = "MANUAL" | "AUTO";

export type RoundSize = "default" | "full";
