import Link from "next/link";
import Text from "components/common/Text";
import { Menu, MenuType } from "types/common";
import { cn } from "utils/common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./Dropdown";

interface Props {
  submenuList: Menu[];
  activeMenu?: MenuType;
}

export default function Menulist({ submenuList, activeMenu }: Props) {
  return (
    <div className="space-x-60">
      {submenuList.map((link) => (
        <DropdownMenu key={link.label}>
          <DropdownMenuTrigger>
            <Text size={4} className="cursor-pointer font-bold">
              {link.label}
            </Text>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {link.subMenus.map((subMenu) => (
              <DropdownMenuItem key={subMenu.label} asChild>
                <Link href={subMenu.href}>
                  <Text
                    size={3}
                    className={cn("cursor-pointer font-bold text-gray1", {
                      "!text-primary1": subMenu.key === activeMenu,
                    })}
                  >
                    {subMenu.label}
                  </Text>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </div>
  );
}
