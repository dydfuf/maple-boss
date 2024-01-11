import { useRouter } from "next/router";

export default function BoardCreateButton() {
  const router = useRouter();

  const onClick = () => {
    router.push("/board/create");
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
