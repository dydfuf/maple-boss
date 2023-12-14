import { useRouter } from "next/router";

export default function InquiryCreateButton() {
  const router = useRouter();

  const onClick = () => {
    router.push("/inquiry/create");
  };

  return (
    <button
      className="ml-auto mt-20 h-40 w-80 rounded-8 bg-purple-100 text-white"
      onClick={onClick}
    >
      글쓰기
    </button>
  );
}
