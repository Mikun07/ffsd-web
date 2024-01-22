import { InputHTMLAttributes } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export interface TextInputProps extends InputProps {
  label: string;
  title?: string;
  errors?: any
}

// interface TextInputProps extends InputProps {
//   label?: string;
// }
