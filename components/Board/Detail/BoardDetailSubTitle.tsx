interface Props {
  nickname: string;
  date: string;
  views: number;
}

export default function BoardDetailSubTitle({ nickname, date, views }: Props) {
  if (!nickname && !date && !views) {
    return;
  }

  return (
    <p className="text-12 text-gray-700">{`${nickname} | ${date} | 조회 : ${views}`}</p>
  );
}
