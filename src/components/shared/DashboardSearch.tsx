import { Search } from "lucide-react";

interface Props {
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}
const DashboardSearch: React.FC<Props> = ({
  className,
  placeholder = "Search customers, quotes, products...",
  value,
  onChange,
}) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#90A1B9]" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-9 pr-4 py-2.5 border border-border rounded-[14px] bg-[#F8FAFC] outline-none  ${className}`}
      />
    </div>
  );
};

export default DashboardSearch;
