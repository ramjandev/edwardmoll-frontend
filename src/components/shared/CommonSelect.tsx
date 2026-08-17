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
        className={`${className} bg-[#071425] border border-yellow/30 px-3 py-6 cursor-pointer rounded-md text-sm text-white transition-all duration-200  focus:border-yellow data-[state=open]:border-yellow [&>span]:text-white [&_svg]:text-slate-400 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <SelectValue placeholder={placeholder || "Select an option"} />
      </SelectTrigger>

      <SelectContent className="bg-[#0c1f36] border border-yellow/30 rounded-md shadow-lg">
        {item.map((option, index) => (
          <SelectItem
            key={option.value + index}
            value={option.value}
            className="cursor-pointer px-4 py-2 text-sm text-white hover:text-yellow! hover:bg-yellow/10 focus:bg-yellow/10 data-[state=checked]:text-yellow data-[state=checked]:font-bold transition-colors rounded "
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CommonSelect;
