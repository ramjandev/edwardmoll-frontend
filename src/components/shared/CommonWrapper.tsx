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
    <div className={`max-w-[1400px] px-10  mx-auto my-auto ${className}`}>
      {children}
    </div>
  );
};

export default CommonWrapper;
