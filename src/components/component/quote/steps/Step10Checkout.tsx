import CommonButton from "@/components/shared/button/CommonButton";
import SectionHeader from "@/components/shared/header/SectionHeader";
import { Elements } from "@stripe/react-stripe-js";
import { IoIosArrowRoundBack } from "react-icons/io";
import StripeCheckoutForm from "../StripeCheckoutForm";
import { stripePromise } from "../stripeClient";

interface Props {
  bookingResult: any;
  onBack: () => void;
  onSuccess: () => void;
}

const Step10Checkout = ({ bookingResult, onBack, onSuccess }: Props) => {
  return (
    <div className="space-y-6 ">
      <SectionHeader
        title="Secure slot"
        des="Process deposit to schedule trucks and crew."
      />

      <div className="rounded border border-yellow/20 bg-[#071425]/80 p-5 space-y-2 text-sm text-offYellow">
        <div className="flex justify-between">
          <span>Moving Date:</span>
          <span className="font-bold text-white">
            {new Date(bookingResult.requestedDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span>30% Deposit Charge:</span>
          <span className="font-black text-yellow">
            ${Number(bookingResult.depositAmount).toFixed(2)}
          </span>
        </div>
      </div>

      <Elements stripe={stripePromise}>
        <StripeCheckoutForm
          bookingId={bookingResult.bookingId || bookingResult.id}
          amount={Number(bookingResult.depositAmount)}
          onSuccess={onSuccess}
        />
      </Elements>

      <CommonButton onClick={onBack} variant="outline" className="w-full!">
        <IoIosArrowRoundBack />
        Back to booking details
      </CommonButton>
    </div>
  );
};

export default Step10Checkout;
