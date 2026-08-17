import CommonButton from "@/components/shared/button/CommonButton";
import SectionHeader from "@/components/shared/header/SectionHeader";
import { CalendarDays, CreditCard, ShieldCheck } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { IoIosArrowRoundBack } from "react-icons/io";
import type { QuoteFields } from "../schema/quoteSchema";

export const inputClass = {
  input: `w-full rounded-lg border border-[#e0af3b]/20 bg-[#071425]/80 px-4 py-3 text-sm text-white outline-none placeholder:text-offYellow/50 transition-all duration-200 hover:border-[#e0af3b]/40 focus:border-[#e0af3b] focus:ring-2 focus:ring-[#e0af3b]/15`,
  label: `block text-sm font-semibold text-white mb-2`,
  error: `mt-1.5 text-xs font-medium text-red-400`,
};

interface Props {
  form: UseFormReturn<QuoteFields>;
  onBack: () => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  isSubmitting: boolean;
}

const Step9BookingForm: React.FC<Props> = ({
  form,
  onBack,
  onSubmit,
  isSubmitting,
}) => {
  const {
    register,
    formState: { errors },
  } = form;

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#e0af3b]/25 bg-gradient-to-b from-[#03080f] via-[#071625] to-[#0c1b2f] p-5 shadow-2xl sm:p-8 lg:p-10">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#e0af3b]/5 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-[#e0af3b]/5 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 border-b border-[#e0af3b]/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <SectionHeader
              title="Book Your Move"
              des="We only ask for what we need to confirm your date."
            />

            <div className="mt-4 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-yellow" />

              <span className="text-xs font-medium text-offYellow">
                Your information is secure and only used to confirm your move.
              </span>
            </div>
          </div>

          <CommonButton onClick={onBack} variant="outline">
            <IoIosArrowRoundBack className="text-xl" />
            Back
          </CommonButton>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Name + Phone */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Name */}
            <div>
              <label className={inputClass.label}>Name</label>

              <input
                type="text"
                placeholder="Edward Moll"
                {...register("bookingName")}
                className={inputClass.input}
              />

              {errors.bookingName && (
                <p className={inputClass.error}>{errors.bookingName.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className={inputClass.label}>Phone</label>

              <input
                type="tel"
                placeholder="(602) 555-0199"
                {...register("bookingPhone")}
                className={inputClass.input}
              />

              {errors.bookingPhone && (
                <p className={inputClass.error}>
                  {errors.bookingPhone.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={inputClass.label}>Email</label>

            <input
              type="email"
              placeholder="edward@example.com"
              {...register("bookingEmail")}
              className={inputClass.input}
            />

            {errors.bookingEmail && (
              <p className={inputClass.error}>{errors.bookingEmail.message}</p>
            )}
          </div>

          {/* Move Date */}
          <div>
            <label className={inputClass.label}>Move Date</label>

            <div className="relative">
              <input
                type="date"
                min={today}
                {...register("bookingDate")}
                onClick={(e) => {
                  try {
                    e.currentTarget.showPicker();
                  } catch {}
                }}
                className={`${inputClass.input} cursor-pointer pr-12 [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-0`}
              />

              <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-yellow" />
            </div>

            {errors.bookingDate && (
              <p className={inputClass.error}>{errors.bookingDate.message}</p>
            )}
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-1 gap-5">
            {/* Pickup */}
            <div>
              <label className={inputClass.label}>Pickup Address</label>

              <input
                type="text"
                placeholder="123 Phoenix Way, Suite 4, Phoenix, AZ 85001"
                {...register("pickupAddress")}
                className={inputClass.input}
              />

              {errors.pickupAddress && (
                <p className={inputClass.error}>
                  {errors.pickupAddress.message}
                </p>
              )}
            </div>

            {/* Delivery */}
            <div>
              <label className={inputClass.label}>Delivery Address</label>

              <input
                type="text"
                placeholder="789 Scottsdale Rd, Scottsdale, AZ 85251"
                {...register("deliveryAddress")}
                className={inputClass.input}
              />

              {errors.deliveryAddress && (
                <p className={inputClass.error}>
                  {errors.deliveryAddress.message}
                </p>
              )}
            </div>
          </div>

          {/* Payment Information */}
          <div className="rounded-xl border border-dashed border-yellow/25 bg-yellow/5 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow/10 text-yellow">
                <CreditCard className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-yellow">
                  Deposit & Payment
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-offYellow">
                  Online deposit and final invoice payment are coming soon. For
                  now, no payment is required to reserve your date. We'll
                  confirm your flat rate by phone.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <CommonButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Reserving Slot..." : "Reserve My Date"}
            </CommonButton>
          </div>

          <p className="text-center text-xs text-offYellow/70">
            No payment required today • We'll contact you to confirm your
            reservation
          </p>
        </form>
      </div>
    </div>
  );
};

export default Step9BookingForm;
