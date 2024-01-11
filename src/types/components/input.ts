import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export interface TextInputProps extends InputProps {
  label?: string;
}

// interface TextInputProps extends InputProps {
//   label?: string;
// }
