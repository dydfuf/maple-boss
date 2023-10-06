import Image from "next/image";
import Link from "next/link";
import Badge from "components/common/Badge";
import { Boss } from "utils/ssrApi/boss";

interface Props {
  bossList: Boss[];
}

export default function BossListContent({ bossList }: Props) {
  return (
    <div className="mt-20 grid grid-cols-2 gap-16 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {bossList.map((boss) => (
        <Link
          key={`boss-list-${boss.id}`}
          className="flex gap-8 rounded-12 bg-gray-100 p-8"
          href={`/boss/${boss.id}`}
        >
          <Image
            src={IMAGE_LIST[boss.id % 7]}
            alt={boss.name}
            width={100}
            height={100}
            className="h-80 w-80 shrink-0 rounded-12 sm:h-100 sm:w-100"
          />
          <div className="flex flex-col gap-4">
            <p className="text-18 font-bold text-gray-900">{boss.name}</p>
            <Badge variant={boss.clazz}>{boss.clazz}</Badge>
            <p className="text-12 font-bold leading-18">{`레벨제한 : ${boss.entryMinLevel}`}</p>
            <p className="text-12 font-bold leading-18">{`데카 : ${boss.deathLimit}`}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

// TODO: 이미지는 API에서 받아오는걸로 수정한다.
const IMAGE_LIST = [
  "https://i.namu.wiki/i/xY1Dd8-GTIStESxrB6JVuWx6YMtrt-eINaeusMKZV4GwxCRgX2HJ4FI5_sfsafNksd2q-beoDfCsEZDRp6l9ZlDLF0w9SKtW1Qu02WDPoWQSRO8WChTLyAPbpyzW5qAnw_pwC6FWtLhhfmgQlW9xhA.webp",
  "https://i.namu.wiki/i/bkN5kh1Uw1DlGSD_-Fw3p4m4eYoi02gW2HijPRwcuNMMGVHEMx8IK01POhk3DVwpouwqvQj3L-5nXjJ6PE-gjgE4OSYQxoCjqCMR8mJ4f61SxaZ8lVEeYfwKUPybc5EiLkarOlCoYS0qrkhrsxSfKg.webp",
  "https://i.namu.wiki/i/iWXHHR_woJHpYKsjQepLQgcaoBjJT7-W-ShEHVjWjF3AtVGWW-ne77LM9LItLUaHIyTYajm4lsS0soj3K-yquQYRJFOhb9I5kDVHfU3h2QXsyzMOn6bsA0IAUYb-JC_pjY6gRygoHQ9931VjZNtXGA.webp",
  "https://i.namu.wiki/i/Q7NvqlN-NtScEglicDqKCcZR5tPryGIKqyV3vWbmEfJ8-6DZC48y2ThAjTK3Cy6XYvGj0nEYJScecIZf9i44rWctlBMonCYeI4qEH1pJjJs0S8s2LeUKaPiRsFvRyQPb2CQo1dbOEWJXU6Llca5aHQ.webp",
  "https://i.namu.wiki/i/Z_XS1d_kg-59ns-79XLG83LEE-frBktmlmgCHmxfHCNusXBXY8Zt4XfTqgw4C_zYdJA_VaY_CdbKyJbrgvlkpk5kgb7cRuW921DB_X5tOrjBaK5eUhi5pnXHCdvGz3rB_BWmOjc7iZMdeQ59mNXaTQ.webp",
  "https://i.namu.wiki/i/-gdwgnsAguUXFykbB1HwsVwHXd--Ag2DFsxVtF5wqAWQKaD6WwM13wmZlEWoeIWwETGlUJMHRs_5wqgrI9zNETcR4MNCnrBDFKyVKVbzBBIzCYiw1uwV211zDuCjyd75QhMc_Quu0tl0YkBoTMFR7A.webp",
  "https://i.namu.wiki/i/7DnXCP0PhB7mIYCnSEYhZ8cOBVigdE6rxJ2fuVYRNOiWhzswXPnG2Vei5edN54VIWE3Vh_ewdkWOhpIT0gQsyPqXNvUB3-ghAZAN3cJBZ1wW7k4KUgNIpY8v104THYEoEDJflMNFxlgFRs2U-eLCOQ.webp",
];
