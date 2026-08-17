import CommonButton from "@/components/shared/button/CommonButton";
import { useMockPaySuccessMutation } from "@/store/bookings/bookingApi";
import { useCreatePaymentIntentMutation } from "@/store/payments/paymentApi";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

interface StripeCheckoutFormProps {
  bookingId: string;
  amount: number;
  onSuccess: () => void;
}

const StripeCheckoutForm = ({
  bookingId,
  amount,
  onSuccess,
}: StripeCheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent, { isLoading: isIntentLoading }] =
    useCreatePaymentIntentMutation();
  const [mockPaySuccess] = useMockPaySuccessMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage("");

    try {
      const intentRes = await createPaymentIntent({ bookingId }).unwrap();
      const clientSecret = intentRes.clientSecret;

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card: cardElement },
        },
      );

      if (error) {
        setErrorMessage(error.message || "Payment verification failed.");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        const isLocal = import.meta.env.VITE_USE_MOCK_PAY === "true";
        if (isLocal) {
          try {
            await mockPaySuccess(bookingId).unwrap();
          } catch (confirmErr: any) {
            console.warn(
              "Mock pay notice:",
              confirmErr?.data?.message || confirmErr,
            );
          }
        }
        onSuccess();
      }
    } catch (err: any) {
      setErrorMessage(
        err.data?.message || err.message || "Something went wrong.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-md border border-yellow/20 bg-[#0d1e33] p-4">
        <CardElement
          options={{
            style: {
              base: {
                color: "#ffffff",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": { color: "#94a3b8" },
              },
              invalid: { color: "#ef4444", iconColor: "#ef4444" },
            },
          }}
        />
      </div>

      {errorMessage && (
        <div className="text-sm text-red-400 font-medium bg-red-950/40 border border-red-800 rounded p-2">
          {errorMessage}
        </div>
      )}

      <CommonButton
        type="submit"
        disabled={!stripe || isProcessing || isIntentLoading}
        className="w-full!"
      >
        {isProcessing
          ? "Processing Security Deposit..."
          : `Pay Deposit $${amount.toFixed(2)}`}
      </CommonButton>
    </form>
  );
};

export default StripeCheckoutForm;
