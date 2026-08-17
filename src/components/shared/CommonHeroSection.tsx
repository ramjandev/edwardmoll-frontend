import type { FC } from "react";

interface CommonHeroSectionProps {
  title: string;
  description: string;
  blackText: string;
  yellowText: string;
}

const CommonHeroSection: FC<CommonHeroSectionProps> = ({
  title,
  description,
  blackText,
  yellowText,
}) => {
  return (
    <div className="flex flex-col items-center justify-center  space-y-3 pb-10 sm:pb-16">
      <div className=" w-fit flex items-center gap-2  text-sm font-semibold tracking-wider text-yellow uppercase">
        {title}
      </div>
      <div className="text-4xl sm:text-5xl font-black uppercase  leading-none text-white max-w-2xl  text-center tracking-[2px]  ">
        {blackText}
        <span className="text-yellow ml-1">{yellowText}</span>
      </div>
      <p className="text-base font-semibold tracking-wider text-offYellow max-w-xl text-center ">
        {description}
      </p>
    </div>
  );
};

export default CommonHeroSection;
