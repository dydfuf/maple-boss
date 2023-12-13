import { useRouter } from "next/router";
import { cn } from "utils/common";

export default function RankingWorldNavigator() {
  const router = useRouter();
  const { world } = router.query;

  const worldNum = Number(world);
  const currentWorld = WORLD_NAME_LIST[worldNum];

  const onClick = (worldName: string) => {
    const targetWorldNum = WORLD_NAME_LIST.findIndex(
      (name) => name === worldName
    );
    router.push(`/ranking/${targetWorldNum}/1`);
  };

  return (
    <div className="mt-20 grid grid-cols-10 gap-8">
      {WORLD_NAME_LIST.map((worldName) => (
        <button
          key={worldName}
          className={cn("rounded-8 border-1 p-8 font-semibold", {
            "bg-purple-100 text-white": worldName === currentWorld,
          })}
          onClick={() => {
            onClick(worldName);
          }}
        >
          {worldName}
        </button>
      ))}
    </div>
  );
}

const WORLD_NAME_LIST = [
  "전체월드",
  "리부트2",
  "리부트",
  "오로라",
  "레드",
  "이노시스",
  "유니온",
  "스카니아",
  "루나",
  "제니스",
  "크로아",
  "베라",
  "엘리시움",
  "아케인",
  "노바",
];
