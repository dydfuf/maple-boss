interface Props {
  date: string;
}

export default function InquiryDetailSubTitle({ date }: Props) {
  return <p className="text-12 text-gray-700">{`${date}`}</p>;
}
