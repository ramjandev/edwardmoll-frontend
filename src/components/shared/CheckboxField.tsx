import { type InputHTMLAttributes } from "react";

interface CheckboxFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  labelClassName?: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  description,
  labelClassName,
  ...props
}) => {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <input
        type="checkbox"
        className="mt-1 w-4 h-4 rounded  accent-[#1447E6] cursor-pointer"
        {...props}
      />
      <div>
        {label && (
          <div
            className={`text-sm font-semibold text-[#0F172B]  transition-colors ${labelClassName}`}
          >
            {label}
          </div>
        )}
        {description && (
          <div className="text-xs text-[#62748E] mt-0.5">{description}</div>
        )}
      </div>
    </label>
  );
};

export default CheckboxField;
