import type { FC } from "react";

interface SectionHeaderProps {
  subtitle?: string;
  des?: string;
  title: string;
  className?: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({
  subtitle,
  title,
  des,
  className = "",
}) => {
  return (
    <div className={` max-w-xl ${className}`}>
      {subtitle && (
        <h3 className=" text-sm font-black uppercase tracking-widest text-yellow mb-1 flex items-center gap-1">
          <span className=" h-px w-8 bg-yellow block" /> {subtitle}
        </h3>
      )}
      <h2 className=" font-black uppercase  text-white text-lg sm:text-3xl md:text-4xl lg:text-5xl ">
        {title}
      </h2>
      {des && (
        <h3 className=" text-base tracking-wider text-offYellow pt-1">{des}</h3>
      )}
    </div>
  );
};

export default SectionHeader;
