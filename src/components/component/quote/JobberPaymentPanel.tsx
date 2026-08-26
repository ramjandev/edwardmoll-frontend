import CommonButton from "@/components/shared/button/CommonButton";
import { useSimulateDepositPaidMutation } from "@/store/bookings/bookingApi";
import {
  useCreateDepositInvoiceMutation,
  useLazyGetPaymentStatusQuery,
} from "@/store/payments/paymentApi";
import { useEffect, useRef, useState } from "react";

interface JobberPaymentPanelProps {
  bookingId: string;
  amount: number;
  /** Payment link returned when the booking was created, if it was ready then. */
  initialPaymentUrl?: string | null;
  onSuccess: () => void;
}

const POLL_INTERVAL_MS = 5000;

/**
 * Payment happens inside Jobber, not on this site. The customer opens their
 * Jobber Client Hub invoice, pays there, and this panel polls the backend until
 * Jobber's webhook confirms the deposit landed.
 */
const JobberPaymentPanel = ({
  bookingId,
  amount,
  initialPaymentUrl,
  onSuccess,
}: JobberPaymentPanelProps) => {
  const [paymentUrl, setPaymentUrl] = useState<string | null>(
    initialPaymentUrl ?? null,
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  const [createDepositInvoice, { isLoading: isCreatingInvoice }] =
    useCreateDepositInvoiceMutation();
  const [fetchStatus] = useLazyGetPaymentStatusQuery();
  const [simulateDepositPaid, { isLoading: isSimulating }] =
    useSimulateDepositPaidMutation();

  const pollRef = useRef<number | null>(null);

  const stopPolling = () => {
    if (pollRef.current !== null) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  useEffect(() => stopPolling, []);

  const checkStatus = async (): Promise<boolean> => {
    try {
      const status = await fetchStatus(bookingId).unwrap();
      if (status.depositPaid) {
        stopPolling();
        setIsWaiting(false);
        onSuccess();
        return true;
      }
      if (!paymentUrl && status.depositInvoiceUrl) {
        setPaymentUrl(status.depositInvoiceUrl);
      }
      return false;
    } catch {
      return false;
    }
  };

  const startPolling = () => {
    stopPolling();
    setIsWaiting(true);
    pollRef.current = window.setInterval(checkStatus, POLL_INTERVAL_MS);
  };

  const handleOpenInvoice = async () => {
    setErrorMessage("");

    let url = paymentUrl;

    if (!url) {
      try {
        const link = await createDepositInvoice({ bookingId }).unwrap();
        url = link.paymentUrl;
        setPaymentUrl(url);
      } catch (err: any) {
        setErrorMessage(
          err?.data?.message ||
            err?.message ||
            "We could not open your invoice. Please call us and we will send it directly.",
        );
        return;
      }
    }

    if (!url) {
      setErrorMessage(
        "Your invoice is being prepared. We have emailed it to you as well.",
      );
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
    startPolling();
  };

  const handleAlreadyPaid = async () => {
    setErrorMessage("");
    const paid = await checkStatus();
    if (!paid) {
      setErrorMessage(
        "We have not received the payment from Jobber yet. It can take a moment after you pay.",
      );
      startPolling();
    }
  };

  // Local development helper: stands in for the Jobber webhook.
  const isMockMode = import.meta.env.VITE_USE_MOCK_PAY === "true";

  const handleSimulate = async () => {
    setErrorMessage("");
    try {
      await simulateDepositPaid(bookingId).unwrap();
      stopPolling();
      onSuccess();
    } catch (err: any) {
      setErrorMessage(err?.data?.message || "Simulation failed.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded border border-yellow/20 bg-[#0d1e33] p-4 space-y-2 text-sm text-offYellow">
        <p className="font-semibold text-white">
          Pay your ${amount.toFixed(2)} deposit securely through Jobber
        </p>
        <p>
          Your invoice opens in a new tab on Jobber, our scheduling and payment
          provider. Your card details are entered there, never on this site.
        </p>
      </div>

      <CommonButton
        onClick={handleOpenInvoice}
        disabled={isCreatingInvoice}
        className="w-full!"
      >
        {isCreatingInvoice
          ? "Preparing your invoice..."
          : `Pay Deposit $${amount.toFixed(2)}`}
      </CommonButton>

      {isWaiting && (
        <div className="rounded border border-yellow/20 bg-[#071425]/80 p-3 text-xs text-offYellow text-center">
          Waiting for Jobber to confirm your payment. You can leave this tab
          open — it updates automatically.
        </div>
      )}

      <CommonButton
        onClick={handleAlreadyPaid}
        variant="outline"
        className="w-full!"
      >
        I have already paid
      </CommonButton>

      {isMockMode && (
        <CommonButton
          onClick={handleSimulate}
          disabled={isSimulating}
          variant="outline"
          className="w-full!"
        >
          {isSimulating ? "Simulating..." : "DEV: simulate paid deposit"}
        </CommonButton>
      )}

      {errorMessage && (
        <div className="text-sm text-red-400 font-medium bg-red-950/40 border border-red-800 rounded p-2">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default JobberPaymentPanel;
