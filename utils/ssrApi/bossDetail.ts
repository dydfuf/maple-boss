import { customedAxios } from "hooks/api/customedAxios";
import { BossClazz } from "hooks/settlement/usePartySettlementSummary";
import { CommonResponse } from "types/common";

interface APIParams {
  bossId: number;
}

interface APIResponse {
  boss: Boss;
  items: Item[];
}

export interface Boss {
  id: number;
  name: string;
  level: number;
  clazz: BossClazz;
  entryMinLevel: number;
  entryMaxLevel: number;
  hpPhaseOne: number;
  hpPhaseTwo: number;
  hpPhaseThree: number;
  hpPhaseFour: number;
  arcaneForce: number;
  authenticForce: number;
  deathLimit: number;
}

export interface Item {
  id: number;
  name: string;
  type: ItemType;
  status: string;
}

type ItemType = "CONSUMABLE" | "EQUIPMENT" | "EXTRA";

export const sendGetBossDetail = ({ bossId }: APIParams) => {
  return customedAxios.get<CommonResponse<APIResponse>>(
    `/api/public/boss/${bossId}`
  );
};
