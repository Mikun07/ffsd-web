import React, { FC, ButtonHTMLAttributes, useMemo } from "react";
import Loading from "../withStatus/loading/Loading";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({
  icon,
  children,
  className,
  loading,
  ...rest
}) => {
  const buttonClassNames = useMemo(() => {
    return `p-2 rounded ring-1 ring-[#40B52D] hover:text-white hover:bg-[#D4973B] hover:bg-opacity-85 hover:ring-[#D4973B] hover:ring-opacity-85 disabled:ring-gray-600 disabled:text-gray-600 disabled:hover:bg-transparent text-sm bg-transparent text-[#40B52D] ${className}`;
  }, [className]);

  const loadingClassNames = useMemo(() => {
    return `p-2 rounded flex items-center justify-center w-full h-8 text-sm bg-transparent text-[#40B52D] ${className}`;
  }, [className]);

  return (
    <button className={buttonClassNames} {...rest}>
      {loading ? (
        <Loading width="25" className={loadingClassNames} />
      ) : (
        <>
          <span>{icon}</span>
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

export default Button;
