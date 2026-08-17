import SectionHeader from "@/components/shared/header/SectionHeader";
import type { UseFormReturn } from "react-hook-form";
import { step3Options } from "../quoteOptions";
import type { QuoteFields } from "../schema/quoteSchema";
import SelectableCard from "../SelectableCard";

interface Props {
  form: UseFormReturn<QuoteFields>;
}

const Step3Distance = ({ form }: Props) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="How far are you moving?"
        des="Local Phoenix moves keep our flat rates lowest."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {step3Options.map((opt) => (
          <SelectableCard
            key={opt.name}
            Icon={opt.icon}
            label={opt.name}
            isSelected={watch("distanceCategory") === opt.name}
            onClick={() => setValue("distanceCategory", opt.name)}
          />
        ))}
      </div>
      {errors.distanceCategory && (
        <p className="text-xs font-semibold text-red-400">
          {errors.distanceCategory.message}
        </p>
      )}
    </div>
  );
};

export default Step3Distance;
