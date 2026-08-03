import type React from "react";

interface InfoCardProps {
  label?: string;
  value?: string;

  cardClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
  image?: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({
  label,
  value,
  cardClassName,
  labelClassName,
  valueClassName,
  image,
}) => {
  return (
    <div className={`rounded-[14px] border p-4 ${cardClassName} space-y-1.5`}>
      <div className="flex gap-2">
        {image && <div>{image}</div>}
        <div>
          <p
            className={`text-[12px] font-semibold tracking-[0.12em] uppercase mb-1 ${
              labelClassName || "text-[#64748B]"
            }`}
          >
            {label}
          </p>

          <p
            className={`text-base font-bold leading-tight ${
              valueClassName || "text-[#294566]"
            }`}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
