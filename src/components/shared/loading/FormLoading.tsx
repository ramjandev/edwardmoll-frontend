import { loadingArray } from "@/lib/utils";

const designGrid = "grid grid-cols-1 sm:grid-cols-[120px_1fr] items-center gap-4 sm:gap-6";

interface FormLoadingProps {
  fields?: number;
  showAvatar?: boolean;
}

const FormLoading = ({ fields = 3, showAvatar = true }: FormLoadingProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {showAvatar && (
        <div className={designGrid}>
          <div className="h-4 w-16 rounded bg-gray-200 animate-pulse justify-self-end hidden sm:block" />
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse shrink-0" />
            <div className="space-y-2">
              <div className="h-8 w-28 rounded-md bg-gray-200 animate-pulse" />
              <div className="h-3 w-40 rounded bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {loadingArray(fields).map((_val: number, index: number) => (
        <div key={index} className={designGrid}>
          <div className="h-4 w-20 rounded bg-gray-200 animate-pulse justify-self-end hidden sm:block" />
          <div className="h-10 w-full rounded-md bg-gray-200 animate-pulse" />
        </div>
      ))}

      <div className="pt-6 mt-6 border-t border-border!">
        <div className="h-10 w-36 rounded-md bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};

export default FormLoading;
