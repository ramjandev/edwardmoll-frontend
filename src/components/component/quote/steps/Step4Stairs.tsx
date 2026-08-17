import SectionHeader from "@/components/shared/header/SectionHeader";
import type { UseFormReturn } from "react-hook-form";
import { step4Options } from "../quoteOptions";
import type { QuoteFields } from "../schema/quoteSchema";
import SelectableCard from "../SelectableCard";

interface Props {
  form: UseFormReturn<QuoteFields>;
}

const Step4Stairs = ({ form }: Props) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Any Stairs?"
        des="Stairs affect crew time – be generous if you're not sure."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {step4Options.map((opt) => (
          <SelectableCard
            key={opt}
            label={opt}
            isSelected={watch("stairsCategory") === opt}
            onClick={() => setValue("stairsCategory", opt)}
          />
        ))}
      </div>
      {errors.stairsCategory && (
        <p className="text-xs font-semibold text-red-400">
          {errors.stairsCategory.message}
        </p>
      )}
    </div>
  );
};

export default Step4Stairs;
