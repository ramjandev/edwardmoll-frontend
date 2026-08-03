import type { ComponentPropsWithoutRef, ComponentType, ReactNode } from "react";

interface ButtonWithIconProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  icon?: ComponentType<{ className?: string }>;
  type?: "button" | "submit" | "reset";
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  children,
  icon: Icon,
  className = "",
  type = "button",
  ...props
}) => (
  <button
    type={type}
    {...props}
    className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2.5 rounded-md font-medium text-sm sm:text-lg   cursor-pointer  text-white transition-all shrink-0 ${className} `}
  >
    {Icon && <Icon className="min-w-4 min-h-4 " />}
    {children}
  </button>
);

export default ButtonWithIcon;
