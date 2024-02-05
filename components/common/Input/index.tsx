import { forwardRef, InputHTMLAttributes, ReactElement, Ref } from "react";
import { RoundSize } from "types/common";
import { cn } from "utils/common";
import { MOBILE_TEXT_VARIANTS, PC_TEXT_VARIANTS } from "../Text";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  roundSize?: RoundSize;
  innerButton?: ReactElement;
}

function Input(
  { roundSize = "default", innerButton, disabled, className, ...rest }: Props,
  ref?: Ref<HTMLInputElement>
) {
  return (
    <div
      className={cn(
        "border-1 border-gray7 px-20 py-11 text-gray1",
        "focus-within:border-gray1 focus-within:outline-none",
        PC_TEXT_VARIANTS[3],
        MOBILE_TEXT_VARIANTS[3],

        {
          "rounded-10": roundSize === "default",
          "rounded-full": roundSize === "full",
          "border-gray8 bg-gray8 text-gray6": disabled,
          "flex items-center space-x-20": innerButton,
        }
      )}
    >
      <input
        className={cn(
          "h-full w-full bg-transparent focus:outline-none",
          className
        )}
        disabled={disabled}
        {...rest}
        ref={ref}
      />
      {innerButton}
    </div>
  );
}

export default forwardRef(Input);
