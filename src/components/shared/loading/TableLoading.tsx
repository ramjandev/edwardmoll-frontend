import { loadingArray } from "@/lib/utils";

interface TableLoadingProps {
  rows?: number;
  columns?: number;
}

const TableLoading = ({ rows = 10, columns = 4 }: TableLoadingProps) => {
  return (
    <div className="w-full border border-border rounded-md bg-white p-4 my-6">
      <div className="flex flex-col gap-3">
        {/* First row */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {loadingArray(columns).map((_val: number, index: number) => (
            <div
              key={index}
              className="h-10 rounded-md bg-gray-200 animate-pulse"
            />
          ))}
        </div>

        {/* Remaining rows */}
        {loadingArray(rows - 1).map((_val: number, index: number) => (
          <div
            key={index}
            className="h-10 w-full rounded-md bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

export default TableLoading;
