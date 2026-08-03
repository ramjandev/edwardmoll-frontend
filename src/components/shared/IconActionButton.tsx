import { Loader2, Trash2, X } from "lucide-react";
import type { FC } from "react";
import { HiOutlinePencil } from "react-icons/hi2";
import { MdOutlineRemoveRedEye } from "react-icons/md";

interface IconActionButtonProps {
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  isLoading?: boolean;
  variant?: "edit" | "delete" | "remove" | "view";
}

const variantClasses: Record<
  NonNullable<IconActionButtonProps["variant"]>,
  string
> = {
  edit: "text-[#62748E] hover:bg-[#F1F5F9] hover:text-[#155DFC]",
  delete: "text-[#E7000B] hover:bg-red-50 hover:text-[#E7000B]",
  view: "text-[#62748E] hover:bg-[#F1F5F9] hover:text-[#155DFC]",
  remove: "text-[#E7000B] hover:bg-red-50",
};

const IconActionButton: FC<IconActionButtonProps> = ({
  title,
  onClick,
  variant = "edit",
  className = "",
  isLoading = false,
}) => {
  const renderIcon = () => {
    if (isLoading) {
      return <Loader2 size={15} className="animate-spin" />;
    }

    switch (variant) {
      case "edit":
        return <HiOutlinePencil size={15} />;
      case "delete":
        return <Trash2 size={15} />;
      case "remove":
        return <X size={15} />;
      case "view":
        return <MdOutlineRemoveRedEye size={15} />;
      default:
        return null;
    }
  };

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={isLoading}
      className={`p-1.5 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`}
    >
      {renderIcon()}
    </button>
  );
};

export default IconActionButton;
