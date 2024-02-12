import { forwardRef, Ref } from "react";
import { cn } from "utils/common";
import { MOBILE_TEXT_VARIANTS, PC_TEXT_VARIANTS } from "../Text";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

function Textarea(
  { className, ...rest }: TextareaProps,
  ref?: Ref<HTMLTextAreaElement>
) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "rounded-10 border-1 border-gray7 px-20 py-11 text-gray1",
        PC_TEXT_VARIANTS[3],
        MOBILE_TEXT_VARIANTS[3],
        className
      )}
      {...rest}
    />
  );
}

export default forwardRef(Textarea);
