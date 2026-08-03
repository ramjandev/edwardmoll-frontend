export type KnownStatus =
  | "approved"
  | "active"
  | "paid"
  | "sent"
  | "partial"
  | "draft"
  | "unpaid"
  | "in progress"
  | "completed"
  | "pending"
  | "overdue"
  | "failed";

export type Status = KnownStatus | (string & {});

interface StatusBadgeProps {
  status: Status;
  label?: string;
}

// Tailwind class pairs per status. Extend this object to support new
// statuses without touching the component logic.
const STATUS_STYLES: Record<KnownStatus, string> = {
  approved: "bg-[#D0FAE5] text-[#007A55]",
  active: "bg-[#D0FAE5] text-[#007A55]",
  paid: "bg-[#D0FAE5] text-[#007A55]",
  sent: "bg-[#FEF3C6] text-[#BB4D00]",
  partial: "bg-[#FEF3C6] text-[#BB4D00]",
  draft: "bg-[#F1F5F9] text-[#314158]",
  unpaid: "bg-[#F1F5F9] text-[#314158]",
  "in progress": "bg-[#5BC0DE] text-white",
  completed: "bg-[#5CB85C] text-white",
  pending: "bg-[#428BCA] text-white",
  overdue: "bg-[#FFE2E2] text-[#C10007]",
  failed: "bg-[#D9534F] text-white",
};

const DEFAULT_LABELS: Record<KnownStatus, string> = {
  approved: "Approved",
  active: "Active",
  paid: "Paid",
  sent: "Sent",
  partial: "Partial",
  draft: "Draft",
  unpaid: "Unpaid",
  "in progress": "In Progress",
  completed: "Completed",
  pending: "Pending",
  overdue: "Overdue",
  failed: "Failed",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const styles = STATUS_STYLES[status as KnownStatus] ?? STATUS_STYLES.draft;

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-3.5 py-1 text-sm font-medium ${styles}`}
    >
      {label ?? DEFAULT_LABELS[status as KnownStatus] ?? status}
    </span>
  );
};

export default StatusBadge;
