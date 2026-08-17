import type { FC, ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  desc: string;
  icon: ReactNode;
  onClick?: () => void;
}

const StatsCard: FC<ServiceCardProps> = ({ title, desc, icon, onClick }) => {
  return (
    <div
      className="flex cursor-pointer items-start gap-4 rounded-lg border border-yellow/30 bg-[#0d1e33]/50 p-6 transition duration-200 hover:border-yellow hover:bg-[#121C26] group"
      onClick={onClick}
    >
      <div className="p-4 flex shrink-0 items-center justify-center rounded text-yellow  bg-[#2D3334] group-hover:bg-yellow group-hover:text-black">
        {icon}
      </div>

      <div className="space-y-1.5">
        <h3 className="text-lg sm:text-xl  font-extrabold tracking-wide uppercase text-white">
          {title}
        </h3>

        <p className="text-sm leading-relaxed text-offYellow">{desc}</p>
      </div>
    </div>
  );
};

export default StatsCard;
