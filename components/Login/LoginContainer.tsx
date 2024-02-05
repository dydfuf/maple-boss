import LoginForm from "./LoginForm";
import SignUpButton from "./SignUpButton";
import Logo from "@/public/images/Logo.png";

export default function LoginContainer() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex w-360 flex-col items-center rounded-20 bg-white px-30 py-60 shadow-default">
        <img
          src={Logo.src}
          width={100}
          height={100}
          alt="MainLogo"
          className="h-100 w-100"
        />
        <LoginForm />
        <SignUpButton />
      </div>
    </div>
  );
}
