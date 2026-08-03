import { cn } from "@/lib/utils";

interface CustomSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  className,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-12 rounded-full transition-all duration-300 cursor-pointer",
        checked ? "bg-[#EA580C]" : "bg-gray-300",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <span
        className={cn(
          "absolute top-1 h-4 w-4 rounded-full bg-white shadow-md transition-all duration-300",
          checked ? "left-6" : "left-1",
        )}
      />
    </button>
  );
};

export default CustomSwitch;
