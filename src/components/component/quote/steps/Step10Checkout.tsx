import CommonButton from "@/components/shared/button/CommonButton";
import SectionHeader from "@/components/shared/header/SectionHeader";
import { IoIosArrowRoundBack } from "react-icons/io";
import JobberPaymentPanel from "../JobberPaymentPanel";

interface Props {
  bookingResult: any;
  onBack: () => void;
  onSuccess: () => void;
}

const Step10Checkout = ({ bookingResult, onBack, onSuccess }: Props) => {
  return (
    <div className="space-y-6 ">
      <SectionHeader
        title="Secure your slot"
        des="Pay your deposit through Jobber to schedule trucks and crew."
      />

      <div className="rounded border border-yellow/20 bg-[#071425]/80 p-5 space-y-2 text-sm text-offYellow">
        <div className="flex justify-between">
          <span>Moving Date:</span>
          <span className="font-bold text-white">
            {new Date(bookingResult.requestedDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span>30% Deposit Due:</span>
          <span className="font-black text-yellow">
            ${Number(bookingResult.depositAmount).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Balance After Move:</span>
          <span className="font-bold text-white">
            ${Number(bookingResult.balanceAmount).toFixed(2)}
          </span>
        </div>
      </div>

      <JobberPaymentPanel
        bookingId={bookingResult.bookingId || bookingResult.id}
        amount={Number(bookingResult.depositAmount)}
        initialPaymentUrl={bookingResult.paymentUrl}
        onSuccess={onSuccess}
      />

      <CommonButton onClick={onBack} variant="outline" className="w-full!">
        <IoIosArrowRoundBack />
        Back to booking details
      </CommonButton>
    </div>
  );
};

export default Step10Checkout;
