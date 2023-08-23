import Image from "next/image";
import RegisterVerificationForm from "./RegisterVerificationForm";
import MainLogo from "@/public/images/MainLogo.png";

export default function RegisterContainer() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex w-362 flex-col items-center rounded-16 border-1 border-white-100 bg-white px-30 py-40">
        <Image src={MainLogo.src} width={150} height={65} alt="MainLogo" />
        <RegisterVerificationForm />
      </div>
    </div>
  );
}
