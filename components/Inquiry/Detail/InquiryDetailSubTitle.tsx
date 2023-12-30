interface Props {
  author: string;
  date: string;
  viewCount: number;
}

export default function InquiryDetailSubTitle({
  author,
  date,
  viewCount,
}: Props) {
  return (
    <p className="text-12 text-gray-700">{`${author} | ${date} | 조회 : ${viewCount}`}</p>
  );
}
