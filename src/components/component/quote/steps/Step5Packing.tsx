import SectionHeader from "@/components/shared/header/SectionHeader";
import type { UseFormReturn } from "react-hook-form";
import { step5Options } from "../quoteOptions";
import type { QuoteFields } from "../schema/quoteSchema";
import SelectableCard from "../SelectableCard";

interface Props {
  form: UseFormReturn<QuoteFields>;
}

const Step5Packing = ({ form }: Props) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Do you need packing?"
        des="We can bring boxes, pack a room, or handle everything."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {step5Options.map((opt) => (
          <SelectableCard
            key={opt.name}
            Icon={opt.icon}
            label={opt.name}
            isSelected={watch("packingCategory") === opt.name}
            onClick={() => setValue("packingCategory", opt.name)}
          />
        ))}
      </div>
      {errors.packingCategory && (
        <p className="text-xs font-semibold text-red-400">
          {errors.packingCategory.message}
        </p>
      )}
    </div>
  );
};

export default Step5Packing;
