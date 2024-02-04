import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AlarmReddot from "./AlarmReddot";
import { Popover, PopoverTrigger } from "./Popover";
import AlarmPopoverContent from "./Popover/AlarmPopoverContent";
import NeedLoginPopoverContent from "./Popover/NeedLoginPopoverContent";
import UserInfoPopoverContent from "./Popover/UserInfoPopoverContent";
import BellIcon from "@/public/images/Bell.png";
import UserIcon from "@/public/images/User.png";

export default function UserMenuList() {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  const router = useRouter();

  const handleLoginBtnClick = () => {
    router.push(`/login?callbackUrl=${encodeURIComponent(router.asPath)}`);
  };

  return (
    <div className="ml-40 flex space-x-20">
      <Popover>
        <PopoverTrigger>
          <div className="relative flex cursor-pointer items-center justify-center rounded-full border-1 p-10">
            <img src={BellIcon.src} alt="alarm" className="h-24 w-24" />
            {isLoggedIn && <AlarmReddot />}
          </div>
        </PopoverTrigger>
        {!isLoggedIn && (
          <NeedLoginPopoverContent handleLoginBtnClick={handleLoginBtnClick} />
        )}
        {isLoggedIn && <AlarmPopoverContent />}
      </Popover>

      <Popover>
        <PopoverTrigger>
          <img
            src={UserIcon.src}
            alt="user"
            className="h-44 w-44 cursor-pointer"
          />
        </PopoverTrigger>
        {!isLoggedIn && (
          <NeedLoginPopoverContent handleLoginBtnClick={handleLoginBtnClick} />
        )}
        {isLoggedIn && <UserInfoPopoverContent />}
      </Popover>
    </div>
  );
}
