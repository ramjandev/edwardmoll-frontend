import React, { type ReactNode } from "react";
interface CommonWrapperProps {
  children: ReactNode;
  className?: string;
}

const CommonWrapper: React.FC<CommonWrapperProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`w-full max-w-[1400px] px-4 sm:px-10  mx-auto  ${className}`}
    >
      {children}
    </div>
  );
};

export default CommonWrapper;
