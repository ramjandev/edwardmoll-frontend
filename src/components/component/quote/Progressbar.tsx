import type { FC } from "react";

interface ProgressbarProps {
  step: number;
}
const Progressbar: FC<ProgressbarProps> = ({ step }) => {
  return (
    <div>
      {step <= 7 && (
        <div className="flex justify-between items-center  font-black uppercase  tracking-[1px] text-xs pb-2">
          <span className="text-yellow  uppercase">Step {step} of 7</span>
          <span className="text-offYellow">No sign-up required</span>
        </div>
      )}

      {step <= 7 && (
        <div className="w-full h-2 bg-[#162232] rounded-full overflow-hidden ">
          <div
            className="h-full bg-yellow transition-all duration-300"
            style={{ width: `${(step / 7) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default Progressbar;
