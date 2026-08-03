// components/shared/StatsCard.tsx

import type { LucideIcon } from "lucide-react";
import CommonHeader from "./CommonHeader";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;

  cardClassName?: string;
  iconWrapperClassName?: string;
  iconClassName?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  cardClassName,
  iconWrapperClassName,
  iconClassName,
}) => {
  const privacy = false;

  const privacyDesign =
    privacy && title.toLowerCase() === "total revenue"
      ? "blur-md opacity-70 select-none pointer-events-none transition-all duration-300"
      : "transition-all duration-300";
  return (
    <div
      className={`rounded-xl p-6 border  ${cardClassName} flex flex-col gap-2.5`}
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center  ${iconWrapperClassName}`}
      >
        <Icon className={`w-5 h-5 ${iconClassName}`} />
      </div>

      <CommonHeader size="sm">{title}</CommonHeader>
      <CommonHeader size="2xl" className={privacyDesign}>
        {value}
      </CommonHeader>
    </div>
  );
};

export default StatsCard;
