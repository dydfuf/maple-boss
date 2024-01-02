import { customedSSRAxios } from "hooks/api/customedAxios";
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
  levelPhaseOne: number;
  levelPhaseTwo: number;
  levelPhaseThree: number;
  levelPhaseFour: number;
  arcaneForce: number;
  authenticForce: number;
  deathLimit: number;
  imageUrl: string;
}

export interface Item {
  id: number;
  name: string;
  type: ItemType;
  status: string;
}

type ItemType = "CONSUMABLE" | "EQUIPMENT" | "EXTRA";

export const sendGetBossDetail = ({ bossId }: APIParams) => {
  return customedSSRAxios.get<CommonResponse<APIResponse>>(
    `/api/public/boss/${bossId}`
  );
};
