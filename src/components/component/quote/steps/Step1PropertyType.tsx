import SectionHeader from "@/components/shared/header/SectionHeader";
import type { UseFormReturn } from "react-hook-form";
import { step1Options } from "../quoteOptions";
import type { QuoteFields } from "../schema/quoteSchema";
import SelectableCard from "../SelectableCard";

interface Props {
  form: UseFormReturn<QuoteFields>;
}

const Step1PropertyType = ({ form }: Props) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="What are you moving?"
        des="Pick the option that best describes your move."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {step1Options.map((opt) => (
          <SelectableCard
            key={opt.name}
            Icon={opt.icon}
            label={opt.name}
            isSelected={watch("propertyType") === opt.name}
            onClick={() => setValue("propertyType", opt.name)}
          />
        ))}
      </div>
      {errors.propertyType && (
        <p className="text-xs font-semibold text-red-400">
          {errors.propertyType.message}
        </p>
      )}
    </div>
  );
};

export default Step1PropertyType;
