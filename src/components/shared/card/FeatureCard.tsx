import type { KeyboardEvent, ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  className = "",
  onClick,
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`group space-y-3 rounded-lg border border-yellow/30 bg-[#0D1D32] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-yellow/60 hover:bg-[#10243d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow/60 sm:space-y-4 sm:p-5 md:p-6 ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-yellow/30 bg-[#2D3334] text-yellow transition-all duration-300 group-hover:border-yellow/60 group-hover:bg-yellow group-hover:text-black sm:size-11 md:size-12">
          {icon}
        </div>

        <h3 className="text-xs font-black uppercase tracking-wider text-white sm:text-sm">
          {title}
        </h3>
      </div>

      <p className="text-sm leading-relaxed text-offYellow sm:text-base">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
