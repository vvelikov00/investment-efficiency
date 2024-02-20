import { FC } from "react";
import { Input, InputProps } from "./Input";

export const IntegerInput: FC<InputProps> = ({ ...props }) => {
  return (
    <Input
      {...props}
      onKeyDown={(event) => {
        const ignoreKeys = ["e", "E", "+", "-", ".", ","];
        if (ignoreKeys.includes(event.key)) {
          event.preventDefault();
          return;
        }
      }}
      type="number"
      step="1"
      pattern="[0-9]*"
      min={0}
      max={300}
    />
  );
};
