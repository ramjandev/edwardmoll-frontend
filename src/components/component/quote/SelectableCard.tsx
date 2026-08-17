import type { LucideIcon } from "lucide-react";
import { FaCheck } from "react-icons/fa";
import type { IconType } from "react-icons/lib";

export type IconNode = LucideIcon | IconType;
interface SelectableCardProps {
  Icon?: IconNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const SelectableCard: React.FC<SelectableCardProps> = ({
  Icon,
  label,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-md border p-5 flex items-center justify-between cursor-pointer transition duration-300 ${
        isSelected
          ? "border-yellow bg-[#222C33]"
          : "border-yellow/20  hover:border-yellow"
      }`}
    >
      <div className="flex items-center gap-2 sm:gap-4">
        {Icon && (
          <span
            className={`size-10  flex items-center justify-center text-lg rounded-md ${
              isSelected
                ? "text-black bg-yellow "
                : "text-yellow bg-[#162232] border border-yellow/20 "
            }`}
          >
            {<Icon />}
          </span>
        )}
        <span className="text-sm font-bold text-white tracking-wider">
          {label}
        </span>
      </div>
      {isSelected && (
        <span className="text-yellow font-bold">
          <FaCheck />
        </span>
      )}
    </div>
  );
};

export default SelectableCard;
