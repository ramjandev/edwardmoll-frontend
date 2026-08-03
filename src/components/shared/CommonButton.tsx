import clsx from "clsx";
import React from "react";
import { LuCirclePlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import ButtonWithLoading from "./ButtonWithLoading";

const BASE_STYLE =
  "inline-flex items-center justify-center gap-1.5 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto";

const SHAPE_STYLE = {
  pill: "rounded-full",
  rounded: "rounded-2xl",
} as const;

const SIZE_STYLE = {
  xs: "px-3 py-1.5 text-xs [&_svg]:size-3",
  sm: "px-4 py-2 text-sm [&_svg]:size-4",
  md: "px-5 py-2.5 text-base [&_svg]:size-5",
  lg: "px-6 py-3.5 text-lg [&_svg]:size-5",
  xl: "px-8 py-4 text-xl [&_svg]:size-6",
} as const;

const VARIANT_STYLE = {
  primary: "bg-gradient-to-b from-[#0D538F] to-[#0E273C] text-white ",
  primaryBlue: "bg-[#155DFC] text-white hover:opacity-90 ",
  primaryGreen: "bg-[#00A63E] text-white hover:opacity-90 ",
  outline: "text-primary-green border-2 border-primary-green hover:bg-green-50",
  outlineBlue: "text-[#155DFC] border-2 border-[#155DFC] hover:bg-[#155DFC]/10",
  destructive: "bg-red-500 text-white shadow-sm hover:opacity-90",
  secondary:
    "bg-white text-[#314158] hover:bg-[#314158] hover:text-white border border-[#CAD5E2]",
  ghost: "bg-[#E2E8F0] text-[#314158] hover:bg-[#314158] hover:text-white",
} as const;

interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof SIZE_STYLE;
  variant?: keyof typeof VARIANT_STYLE;
  shape?: keyof typeof SHAPE_STYLE;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showDefaultIcon?: boolean;
  to?: string;
  isLoading?: boolean;
  loadingText?: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  className,
  size = "md",
  variant = "primary",
  shape = "rounded",
  leftIcon,
  rightIcon,
  showDefaultIcon = false,
  type = "button",
  to,
  disabled,
  isLoading = false,
  loadingText = "Loading...",
  ...props
}) => {
  const classes = clsx(
    BASE_STYLE,
    SHAPE_STYLE[shape],
    SIZE_STYLE[size],
    VARIANT_STYLE[variant],
    className,
  );

  const isDisabled = disabled || isLoading;

  const content = isLoading ? (
    <ButtonWithLoading title={loadingText} />
  ) : (
    <>
      {leftIcon ?? (showDefaultIcon && <LuCirclePlus />)}
      {children}
      {rightIcon}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={clsx(
          classes,
          isDisabled && "pointer-events-none opacity-50",
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <button disabled={isDisabled} type={type} className={classes} {...props}>
      {content}
    </button>
  );
};

export default CommonButton;
