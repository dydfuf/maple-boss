import Image from "next/image";
import Link from "next/link";
import Badge from "components/common/Badge";
import { Boss } from "utils/ssrApi/boss";

interface Props {
  bossList: Boss[];
}

export default function BossListContent({ bossList }: Props) {
  return (
    <div className="mt-20 grid grid-cols-2 gap-16 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
      {bossList.map((boss) => (
        <Link
          key={`boss-list-${boss.id}`}
          className="flex flex-col items-center gap-8 rounded-12 bg-gray-100 p-8 sm:flex-row"
          href={`/boss/${boss.id}`}
        >
          <Image
            src={boss.imageUrl}
            alt={boss.name}
            width={100}
            height={100}
            className="h-120 w-120 shrink-0 rounded-12 sm:h-100 sm:w-100"
            priority
          />
          <div className="flex flex-col items-center gap-4 sm:items-start">
            <p className="line-clamp-1 text-18 font-bold text-gray-900">
              {boss.name}
            </p>
            <Badge variant={boss.clazz}>{boss.clazz}</Badge>
            <p className="text-12 font-bold leading-18">{`레벨제한 : ${boss.entryMinLevel}`}</p>
            <p className="text-12 font-bold leading-18">{`데카 : ${boss.deathLimit}`}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
