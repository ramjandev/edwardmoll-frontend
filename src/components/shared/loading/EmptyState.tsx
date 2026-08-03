import { Search } from "lucide-react";
import type { FC, ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
}

const EmptyState: FC<EmptyStateProps> = ({
  title,
  description,
  icon = <Search className="h-6 w-6 text-[#A0B0C0]" />,
  className = "",
}) => {
  return (
    <div
      className={`col-span-full flex flex-col items-center justify-center py-20 text-center ${className}`}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F1F5F9]">
        {icon}
      </div>

      <h3 className="mb-1 text-lg font-semibold text-[#374151]">{title}</h3>

      <p className="text-sm text-[#A0B0C0]">{description}</p>
    </div>
  );
};

export default EmptyState;
