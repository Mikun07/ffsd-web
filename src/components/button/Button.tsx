import React, { FC, ButtonHTMLAttributes, useMemo } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({ icon, children, className, ...rest }) => {
  const classNames = useMemo(() => {
    return `p-2 rounded ring-1 ring-[#40B52D] hover:text-white hover:bg-[#D4973B] hover:bg-opacity-85 hover:ring-[#D4973B] hover:ring-opacity-85 disabled:ring-gray-600 disabled:text-gray-600 disabled:hover:bg-transparent text-sm bg-transparent text-[#40B52D] ${className}`;
  }, [className]);

  return (
    <button
      className={classNames}
      {...rest}
    >
      <span>{icon}</span>
      <span>{children}</span>
    </button>
  );
};

export default Button;
