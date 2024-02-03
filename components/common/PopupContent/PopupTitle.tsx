import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Text from "components/common/Text";
interface Props {
  title?: string;
  subTitle?: string;
}

export default function PopupTitle({ title, subTitle }: Props) {
  return (
    <div className="flex flex-col whitespace-pre">
      <AlertDialog.Title>
        {title && (
          <Text className="font-bold" size={5}>
            {title}
          </Text>
        )}
      </AlertDialog.Title>
      {subTitle && (
        <AlertDialog.Description>
          <Text size={4}>{subTitle}</Text>
        </AlertDialog.Description>
      )}
    </div>
  );
}
