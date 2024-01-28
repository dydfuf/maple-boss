import { cn } from "utils/common";
import Text from "../Text";

interface Props {
  message: string;
  className?: string;
}

export default function InputErrorMessage({ message, className }: Props) {
  return (
    <Text size={1} className={cn("text-error", className)}>
      {message}
    </Text>
  );
}
