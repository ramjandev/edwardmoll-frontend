import CommonButton from "@/components/shared/button/CommonButton";
import SectionHeader from "@/components/shared/header/SectionHeader";
import { RxCheck } from "react-icons/rx";

interface Props {
  onReturnHome: () => void;
}

const Step11Success = ({ onReturnHome }: Props) => {
  return (
    <div className="text-center space-y-6 p-6 border border-yellow/30 rounded-2xl ">
      <div className="mx-auto size-20 bg-yellow rounded-full flex items-center justify-center">
        <RxCheck className="size-10 text-[#0D1D32] " />
      </div>

      <div className="space-y-2">
        <SectionHeader
          title="  Move Scheduled!"
          des="Thank you! Your 30% deposit has been securely charged via Stripe. Your
          slot is officially reserved, and details have been synced to Jobber."
        />
        <p className="text-offYellow">
          A moving specialist will call you within one business hour. Prefer to
          talk now?
        </p>
      </div>

      <div className="rounded border border-emerald-900 bg-emerald-950/20 p-4 text-xs text-emerald-400 max-w-sm mx-auto">
        🌵 Synced successfully with Jobber moving coordinator scheduling.
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <CommonButton onClick={onReturnHome} variant="outline">
          Return to Home Page
        </CommonButton>
        <CommonButton showDefaultIcon to="tel:602-921-5749">
          602-921-5749
        </CommonButton>
      </div>
    </div>
  );
};

export default Step11Success;
