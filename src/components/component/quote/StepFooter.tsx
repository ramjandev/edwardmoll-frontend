import CommonButton from "@/components/shared/button/CommonButton";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

interface StepFooterProps {
  onBack?: () => void;
  onNext: () => void;
  loadingLabel?: string;
  isLoading?: boolean;
  nextDisabled?: boolean;
}

const StepFooter: React.FC<StepFooterProps> = ({
  onBack,
  onNext,
  isLoading = false,
  nextDisabled = false,
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row gap-2 pt-4 border-t border-yellow/20 ${
        onBack ? "justify-between" : "justify-end"
      }`}
    >
      {onBack && (
        <CommonButton onClick={onBack} variant="outline">
          <IoIosArrowRoundBack />
          Back
        </CommonButton>
      )}
      <CommonButton
        disabled={isLoading || nextDisabled}
        onClick={onNext}
        className=""
      >
        Continue <IoIosArrowRoundForward />
      </CommonButton>
    </div>
  );
};

export default StepFooter;
