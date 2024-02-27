import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export interface TextAreasProps extends TextAreaProps {
  label?: string;
}
