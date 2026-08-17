import SectionHeader from "@/components/shared/header/SectionHeader";
import type { UseFormReturn } from "react-hook-form";
import { step6Options } from "../quoteOptions";
import type { QuoteFields } from "../schema/quoteSchema";
import SelectableCard from "../SelectableCard";

interface Props {
  form: UseFormReturn<QuoteFields>;
}

const Step6AdditionalServices = ({ form }: Props) => {
  const { watch, setValue } = form;
  const watchAdditionalServices = watch("additionalServices") || [];

  const toggle = (name: string) => {
    const updated = watchAdditionalServices.includes(name)
      ? watchAdditionalServices.filter((s) => s !== name)
      : [...watchAdditionalServices, name];
    setValue("additionalServices", updated);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Additional Services"
        des="Select any that apply — or continue if none."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {step6Options.map((opt) => (
          <SelectableCard
            key={opt.name}
            Icon={opt.icon}
            label={opt.name}
            isSelected={watchAdditionalServices.includes(opt.name)}
            onClick={() => toggle(opt.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default Step6AdditionalServices;
