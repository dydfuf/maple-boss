import Link from "next/link";
import { CDN_HOST } from "constants/common";
import LoginForm from "./LoginForm";
import SignUpButton from "./SignUpButton";

export default function LoginContainer() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex w-362 flex-col items-center rounded-16 border-1 border-white-100 bg-white px-30 py-40">
        <Link href={"/boss"}>
          <img
            src={CDN_HOST + "/common/logo.png"}
            width={150}
            height={65}
            alt="MainLogo"
          />
        </Link>
        <LoginForm />
        <SignUpButton />
      </div>
    </div>
  );
}
