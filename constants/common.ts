import { env } from "env.mjs";

export const API_HOST = env.NEXT_PUBLIC_API_HOST;
export const IS_CLIENT = typeof window !== "undefined";

export enum API_STATUS_CODE {
  "NOT_FOUND" = "E001",
}
