import clsx from "clsx";
import React, { type ReactNode } from "react";

interface CommonHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

const CommonHeader: React.FC<CommonHeaderProps> = ({
  children,
  className = "",
  size = "md",
  ...props
}) => {
  const baseStyles = " flex items-center ";

  // Fixed leading for each size
  const sizeStyles: Record<typeof size, string> = {
    xs: "text-xs leading-4 text-[#6A7282] ",
    sm: "text-sm leading-5 font-normal text-[#45556C] ",
    md: "text-base leading-6 text-gray font-normal ",
    lg: "text-sm sm:text-lg leading-5 sm:leading-7 font-medium text-[#0F172B]",
    xl: "text-xl leading-8 font-bold text-[#0F172B]",
    "2xl":
      "text-xl sm:text-2xl leading-7 sm:leading-8 font-bold text-[#0F172B]",
    "3xl":
      " text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-8 md:leading-10 font-bold text-[#0F172B]",
    "4xl": "text-4xl leading-[3rem] font-bold",
  };

  return (
    <h2 className={clsx(baseStyles, sizeStyles[size], className)} {...props}>
      {children}
    </h2>
  );
};

export default CommonHeader;
