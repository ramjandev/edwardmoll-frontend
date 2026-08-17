import CommonButton from "@/components/shared/button/CommonButton";
import SectionHeader from "@/components/shared/header/SectionHeader";
import type { UseFormReturn } from "react-hook-form";
import type { QuoteFields } from "../schema/quoteSchema";

interface Breakdowns {
  base: number;
  dist: number;
  stairs: number;
  packing: number;
  addl: number;
  specialty: number;
}

interface Props {
  form: UseFormReturn<QuoteFields>;
  calculatedQuote: any;
  breakdowns: Breakdowns;
  onEditAnswers: () => void;
  onBookMove: () => void;
}

const Step8Estimate: React.FC<Props> = ({
  calculatedQuote,
  breakdowns,
  onEditAnswers,
  onBookMove,
}) => {
  const breakdownItems = [
    { label: "Base + Size", value: breakdowns.base },
    { label: "Stairs", value: breakdowns.stairs },
    { label: "Packing", value: breakdowns.packing },
    { label: "Additional Services", value: breakdowns.addl },
    { label: "Large Items", value: breakdowns.specialty },
  ];

  return (
    <div className="space-y-8  ">
      <div className="bg-gradient-to-b from-[#03080f] via-[#071625] to-[#0c1b2f] p-6 rounded-2xl border border-yellow/20 space-y-4">
        <div className="text-center space-y-4">
          <span className="text-xs font-black tracking-[2px] uppercase text-yellow block">
            Your Instant Estimate
          </span>
          <span className="text-2xl  sm:text-5xl md:text-6xl font-black text-yellow er block">
            $
            {Math.round(
              Number(calculatedQuote.estimatedTotal) * 0.9,
            ).toLocaleString()}{" "}
            - $
            {Math.round(
              Number(calculatedQuote.estimatedTotal) * 1.15,
            ).toLocaleString()}
          </span>
          <p className="text-base text-offYellow max-w-lg mx-auto leading-relaxed">
            Flat-rate range based on your selections. Final price confirmed
            after a quick walkthrough – no obligation, ever.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-lg mx-auto ">
          {breakdownItems.map((item) => (
            <div
              key={item.label}
              className="rounded-md bg-[#0E1A2A] shadow  p-2 "
            >
              <span className="text-[10px] font-black tracking-[1px] uppercase text-[#AB8D35] block">
                {item.label}
              </span>
              <span className="text-sm font-bold text-white">
                ${item.value}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-6">
          <CommonButton onClick={onEditAnswers}>Edit Answers</CommonButton>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div className="rounded-lg  p-6 space-y-4 flex flex-col justify-between  border border-yellow/30">
          <SectionHeader
            title="Book This Move"
            des="Reserve your date. A specialist confirms your flat rate within one
              business hour."
          />

          <CommonButton onClick={onBookMove}> Book This Move</CommonButton>
        </div>

        <div className="rounded-lg  border border-yellow/30 p-6 space-y-4 flex flex-col justify-between">
          <SectionHeader
            title="Talk to a Moving Specialist"
            des="Prefer to talk it through? Call now – we answer live during
              business hours."
          />

          <CommonButton
            showDefaultIcon
            href="tel:602-921-5749"
            variant="outline"
          >
            602-921-5749
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default Step8Estimate;
