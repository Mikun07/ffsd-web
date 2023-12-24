import { useEffect, useState, InputHTMLAttributes, FC } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextInput: FC<TextInputProps> = ({ label = "", ...rest }) => {
  return (
    <>
      <input
        className="bg-gray-200 rounded outline-none p-2 text-xs focus:ring-1 ring-[#40B52D]"
        {...rest}
        placeholder={label}
      />
    </>
  );
};

export default TextInput;
