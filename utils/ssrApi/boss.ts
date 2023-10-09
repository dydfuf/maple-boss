import { customedAxios } from "hooks/api/customedAxios";
import { BossClazz } from "hooks/settlement/usePartySettlementSummary";
import { CommonResponse } from "types/common";

interface APIResponse {
  content: Boss[];
}

export interface Boss {
  id: number;
  name: string;
  level: number;
  clazz: BossClazz;
  arcaneForce: number;
  authenticForce: number;
  deathLimit: number;
  entryMinLevel: number;
  imageUrl: string;
}

export const sendGetBossList = () => {
  return customedAxios.get<CommonResponse<APIResponse>>(
    `/api/public/boss?bossClasses=&keywords=&size=50`
  );
};
