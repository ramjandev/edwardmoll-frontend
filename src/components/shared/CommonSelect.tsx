import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // update path if needed

export interface SelectOption<T extends string> {
  label: string;
  value: T;
}

interface SelectProps<T extends string> {
  value: T | undefined;
  item: readonly SelectOption<T>[];
  w?: number;
  onValueChange: (val: T) => void;
  className?: string;
  arrow?: string;
  placeholder?: string;
  disabled?: boolean;
}

const CommonSelect = <T extends string>({
  value,
  item,
  w = 120,
  onValueChange,
  disabled = false,
  className,
  placeholder,
}: SelectProps<T>) => {
  return (
    <Select value={value || undefined} onValueChange={onValueChange}>
      <SelectTrigger
        style={{ minWidth: w }}
        className={` ${className} bg-background border border-border! px-3 py-6 cursor-pointer rounded-md  text-sm  transition-all duration-200  ${
          disabled && "opacity-50 cursor-not-allowed"
        } `}
      >
        <SelectValue placeholder={placeholder || "Select an option"} />
      </SelectTrigger>

      <SelectContent className="bg-white border  rounded-md shadow-md">
        {item.map((option, index) => (
          <SelectItem
            key={option.value + index}
            value={option.value}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100 transition-colors rounded"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CommonSelect;
