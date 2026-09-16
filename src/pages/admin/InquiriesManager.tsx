import { format } from "date-fns";
import { Check, MailOpen } from "lucide-react";
import { toast } from "react-toastify";
import {
  useGetInquiriesQuery,
  useMarkAsReadMutation,
} from "../../store/contact/contactApi";

const InquiriesManager = () => {
  const { data: rawInquiries = [], isLoading } = useGetInquiriesQuery();
  const [markAsRead] = useMarkAsReadMutation();

  const inquiries = Array.isArray(rawInquiries) ? rawInquiries : [];

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id).unwrap();
      toast.success("Marked as read");
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (isLoading) return <div className="text-offYellow p-8">Loading...</div>;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-barlow font-bold uppercase tracking-wide text-white">
          Contact Inquiries
        </h1>
        <p className="text-offYellow mt-1">Review messages from customers</p>
      </div>

      <div className="bg-[#0d1e33] rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-offYellow">
            <thead className="bg-[#071425] text-white uppercase font-barlow tracking-wider border-b border-border">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => {
                const inquiryId = inquiry.id || inquiry._id || "";
                return (
                  <tr
                    key={inquiryId}
                    className={`border-b border-border transition-colors ${
                      !inquiry.isRead
                        ? "bg-[#071425] font-semibold text-white"
                        : "hover:bg-[#071425]/50"
                    }`}
                  >
                    <td className="px-6 py-4">{inquiry.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span>{inquiry.email}</span>
                        {inquiry.phone && (
                          <span className="text-xs text-[#f0c03e]">
                            {inquiry.phone}
                          </span>
                        )}
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 max-w-xs truncate"
                      title={inquiry.message}
                    >
                      {inquiry.message}
                    </td>
                    <td className="px-6 py-4">
                      {inquiry.createdAt
                        ? format(new Date(inquiry.createdAt), "MMM dd, yy")
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {!inquiry.isRead ? (
                        <button
                          onClick={() => handleMarkAsRead(inquiryId)}
                          className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center justify-end w-full"
                          title="Mark as read"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      ) : (
                        <span
                          className="text-gray-500 flex items-center justify-end w-full"
                          title="Read"
                        >
                          <MailOpen className="w-4 h-4" />
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {inquiries.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-offYellow"
                  >
                    No contact inquiries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InquiriesManager;
