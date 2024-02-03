import BellIcon from "@/public/images/Bell.png";
import UserIcon from "@/public/images/User.png";

export default function UserMenuList() {
  // @TODO: #140 로그인 여부에 따라 분기되는 기능을 구현합니다.
  const hasAlarm = true;

  return (
    <div className="ml-40 flex space-x-20">
      <div className="relative flex cursor-pointer items-center justify-center rounded-full border-1 p-10">
        <img src={BellIcon.src} alt="alarm" className="h-24 w-24" />
        {hasAlarm && (
          <div className="absolute right-0 top-0 h-12 w-12 rounded-full bg-error" />
        )}
      </div>
      <img src={UserIcon.src} alt="user" className="h-44 w-44 cursor-pointer" />
    </div>
  );
}
