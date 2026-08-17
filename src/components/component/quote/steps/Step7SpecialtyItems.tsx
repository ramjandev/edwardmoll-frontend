import CommonSelect, {
  type SelectOption,
} from "@/components/shared/CommonSelect"; // update path if needed
import SectionHeader from "@/components/shared/header/SectionHeader";
import type { UseFormReturn } from "react-hook-form";
import { step7Options } from "../quoteOptions";
import type { QuoteFields } from "../schema/quoteSchema";
import SelectableCard from "../SelectableCard";

interface Props {
  form: UseFormReturn<QuoteFields>;
}

const Step7SpecialtyItems: React.FC<Props> = ({ form }) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;
  const watchSelectedSpecialtyItems = watch("selectedSpecialtyItems") || [];

  const toggle = (name: string) => {
    const updated = watchSelectedSpecialtyItems.includes(name)
      ? watchSelectedSpecialtyItems.filter((s) => s !== name)
      : [...watchSelectedSpecialtyItems, name];
    setValue("selectedSpecialtyItems", updated);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Large or Specialty Items?"
        des="Pick any that apply, then tell us the type so we send the right crew
        and equipment."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {step7Options.map((opt) => {
          const isSelected = watchSelectedSpecialtyItems.includes(opt.name);
          const dropdownOptions: SelectOption<string>[] = opt.options.map(
            (val) => ({
              label: val,
              value: val,
            }),
          );
          const fieldError = errors[opt.dropdownKey];

          return (
            <div key={opt.name} className="flex flex-col gap-2">
              <SelectableCard
                Icon={opt.icon}
                label={opt.name}
                isSelected={isSelected}
                onClick={() => toggle(opt.name)}
              />

              {isSelected && (
                <div className="animate-slideDown space-y-1">
                  <CommonSelect
                    value={watch(opt.dropdownKey)}
                    item={dropdownOptions}
                    placeholder="Select type..."
                    onValueChange={(val) =>
                      setValue(opt.dropdownKey, val, { shouldValidate: true })
                    }
                    className="w-full"
                  />
                  {fieldError && (
                    <p className="text-[10px] text-red-400">
                      {fieldError.message as string}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Step7SpecialtyItems;
