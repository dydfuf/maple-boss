export interface CommonResponse<T> {
  code: string;
  message: string;
  data: T;
}

export type SettlementType = "MANUAL" | "AUTO";

export type RoundSize = "default" | "full";

export interface Menu {
  label: string;
  type: string;
  subMenus: SubMenu[];
}

export interface SubMenu {
  key: MenuType;
  label: string;
  href: string;
}

export enum MenuType {
  PARTY,
  SETTLEMENT,
  RANKING,
  BOARD,
  BOSS,
  UNION_SIMULATOR,
}