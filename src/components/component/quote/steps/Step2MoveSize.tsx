import SectionHeader from "@/components/shared/header/SectionHeader";
import type { UseFormReturn } from "react-hook-form";
import { step2Options } from "../quoteOptions";
import type { QuoteFields } from "../schema/quoteSchema";
import SelectableCard from "../SelectableCard";

interface Props {
  form: UseFormReturn<QuoteFields>;
}

const Step2MoveSize = ({ form }: Props) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="How big is the space?"
        des="Size helps us estimate crew and truck time."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {step2Options.map((opt) => (
          <SelectableCard
            key={opt}
            label={opt}
            isSelected={watch("moveSize") === opt}
            onClick={() => setValue("moveSize", opt)}
          />
        ))}
      </div>
      {errors.moveSize && (
        <p className="text-xs font-semibold text-red-400">
          {errors.moveSize.message}
        </p>
      )}
    </div>
  );
};

export default Step2MoveSize;
