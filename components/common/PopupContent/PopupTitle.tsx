import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Text from "components/common/Text";
import { cn } from "utils/common";
interface Props {
  title?: string;
  subTitle?: string;
  titleClassName?: string;
  subTitleClassName?: string;
}

export default function PopupTitle({
  title,
  subTitle,
  titleClassName,
  subTitleClassName,
}: Props) {
  return (
    <div className="flex flex-col whitespace-pre">
      <AlertDialog.Title asChild>
        {title && (
          <Text className={cn("font-bold", titleClassName)} size={5}>
            {title}
          </Text>
        )}
      </AlertDialog.Title>
      {subTitle && (
        <AlertDialog.Description asChild>
          <Text size={4} className={cn(subTitleClassName)}>
            {subTitle}
          </Text>
        </AlertDialog.Description>
      )}
    </div>
  );
}
