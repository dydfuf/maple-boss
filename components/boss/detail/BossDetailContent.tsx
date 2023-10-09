import { formatToKoreanNumber } from "@toss/utils";
import Image from "next/image";
import Badge from "components/common/Badge";
import { Boss, Item } from "utils/ssrApi/bossDetail";

interface Props {
  boss: Boss;
  items: Item[];
}

export default function BossDetailContent({ boss, items }: Props) {
  const {
    name,
    clazz,
    level,
    entryMinLevel,
    arcaneForce,
    authenticForce,
    deathLimit,
    hpPhaseOne,
    hpPhaseTwo,
    hpPhaseThree,
    hpPhaseFour,
    levelPhaseOne,
    levelPhaseTwo,
    levelPhaseThree,
    levelPhaseFour,
    imageUrl,
  } = boss || {};

  const descriptionList = [
    { label: "보스레벨", value: level },
    { label: "입장 최소레벨", value: entryMinLevel },
    { label: "아케인포스", value: arcaneForce },
    { label: "어센틱포스", value: authenticForce },
    { label: "데스카운트", value: deathLimit },
  ];

  const phaseHpList = [
    hpPhaseOne && { label: "1 페이즈", value: hpPhaseOne },
    hpPhaseTwo && { label: "2 페이즈", value: hpPhaseTwo },
    hpPhaseThree && { label: "3 페이즈", value: hpPhaseThree },
    hpPhaseFour && { label: "4 페이즈", value: hpPhaseFour },
  ].filter(Boolean);

  const phaseLevelList = [
    levelPhaseOne && { label: "1 페이즈", value: levelPhaseOne },
    levelPhaseTwo && { label: "2 페이즈", value: levelPhaseTwo },
    levelPhaseThree && { label: "3 페이즈", value: levelPhaseThree },
    levelPhaseFour && { label: "4 페이즈", value: levelPhaseFour },
  ].filter(Boolean);

  return (
    <div className="mt-20 flex flex-wrap gap-20 md:flex-nowrap">
      <div className="flex w-full shrink-0 flex-col rounded-12 bg-gray-200 p-20 md:w-400">
        <Image
          src={imageUrl}
          alt={name || ""}
          width={400}
          height={400}
          className="w-full rounded-12"
          priority
        />
        <ul className="mt-30 flex h-full w-full flex-col gap-10 [&_li]:flex [&_li]:h-44 [&_li]:w-full [&_li]:items-center [&_li]:rounded-8 [&_li]:bg-white [&_li]:px-20">
          <li className="justify-center gap-6 !bg-main-2 !text-white">
            <span className="text-18 font-bold">{name}</span>
            <Badge variant={"CONTRAST"}>{clazz}</Badge>
          </li>
          {descriptionList.map((description) => (
            <li className="justify-between" key={description.label}>
              <span className="text-14 font-bold">{description.label}</span>
              <span className="text-14">{description.value}</span>
            </li>
          ))}
          <li className="justify-center gap-6 !bg-main-2 !text-white">
            <span className="text-18 font-bold">페이즈별 HP</span>
          </li>
          {phaseHpList.map((phase) => (
            <li className="justify-between" key={phase.label}>
              <span className="text-14 font-bold">{phase.label}</span>
              <span className="text-14">
                {`${phase.value.toLocaleString()} `}
                <span className="font-bold">
                  ({formatToKoreanNumber(phase.value)})
                </span>
              </span>
            </li>
          ))}
          <li className="justify-center gap-6 !bg-main-2 !text-white">
            <span className="text-18 font-bold">페이즈별 레벨</span>
          </li>
          {phaseLevelList.map((phase) => (
            <li className="justify-between" key={phase.label}>
              <span className="text-14 font-bold">{phase.label}</span>
              <span className="text-14">{phase.value}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex w-full flex-col rounded-12 bg-gray-200 p-20">
        <ul className="flex h-full w-full flex-col gap-10 [&_li]:flex [&_li]:h-44 [&_li]:w-full [&_li]:items-center [&_li]:rounded-8 [&_li]:bg-white [&_li]:px-20">
          <li className="justify-center gap-6 !bg-main-2 !text-white">
            <span className="text-18 font-bold">드랍 아이템</span>
          </li>
          {items?.map((item) => (
            <li
              className="justify-between gap-x-8"
              key={`boss-drop-items-${item.id}`}
            >
              <span className="text-14 font-bold">{item.name}</span>
              <span className="text-14">{ITEM_TYPE_TO_HANGEUL[item.type]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const ITEM_TYPE_TO_HANGEUL = {
  CONSUMABLE: "소비용",
  EXTRA: "기타",
  EQUIPMENT: "장비",
};
