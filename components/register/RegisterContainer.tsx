import Image from "next/image";
import Link from "next/link";
import { CDN_HOST } from "constants/common";
import RegisterVerificationForm from "./RegisterVerificationForm";

export default function RegisterContainer() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex w-362 flex-col items-center rounded-16 border-1 border-white-100 bg-white px-30 py-40">
        <Link href={"/boss"}>
          <Image
            src={CDN_HOST + "/common/logo.png"}
            width={150}
            height={65}
            alt="MainLogo"
          />
        </Link>
        <RegisterVerificationForm />
      </div>
    </div>
  );
}
