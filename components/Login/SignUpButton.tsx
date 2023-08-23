import Link from "next/link";

export default function SignUpButton() {
  return (
    <Link
      href="/register"
      className="mt-10 flex h-44 w-full items-center justify-center rounded-8 border-1 border-white-100"
    >
      <span className="text-14 font-semibold leading-14 text-black">
        회원가입
      </span>
    </Link>
  );
}
