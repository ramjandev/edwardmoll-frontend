import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  useGetBookingsQuery,
  useMockPaySuccessMutation,
  useSimulateJobCompleteMutation,
  useCompleteOfflineMutation,
} from "../store/bookings/bookingApi";
import logoImg from "../assets/images/logo.png";
import type { RootState } from "../store/store";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  // RTK Queries & Mutations
  const { data: bookings = [], isLoading, refetch } = useGetBookingsQuery();
  const [mockPaySuccess, { isLoading: isPayLoading }] = useMockPaySuccessMutation();
  const [simulateJobComplete, { isLoading: isCompleteLoading }] =
    useSimulateJobCompleteMutation();
  const [completeOffline, { isLoading: isOfflineLoading }] =
    useCompleteOfflineMutation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleMockPay = async (bookingId: string) => {
    try {
      await mockPaySuccess(bookingId).unwrap();
      refetch();
    } catch (err) {
      // Base API handles errors automatically
    }
  };

  const handleSimulateComplete = async (jobberJobId: string) => {
    try {
      await simulateJobComplete(jobberJobId).unwrap();
      refetch();
    } catch (err) {
      // Base API handles errors automatically
    }
  };

  const handleCompleteOffline = async (bookingId: string) => {
    try {
      await completeOffline(bookingId).unwrap();
      refetch();
    } catch (err) {
      // Base API handles errors automatically
    }
  };

  // Compute Stats
  const totalBookings = bookings.length;
  const completedMoves = bookings.filter((b) => b.status === "BALANCE_PAID").length;
  const pendingDeposits = bookings.filter((b) => b.status === "DEPOSIT_PENDING").length;
  const totalRevenue = bookings
    .filter((b) => b.status !== "CANCELLED")
    .reduce((sum, b) => sum + Number(b.totalAmount || 0), 0);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "DEPOSIT_PENDING":
        return "bg-amber-500/10 border-amber-500/35 text-amber-400";
      case "DEPOSIT_PAID":
        return "bg-blue-500/10 border-blue-500/35 text-blue-400";
      case "SCHEDULED":
        return "bg-indigo-500/10 border-indigo-500/35 text-indigo-400";
      case "BALANCE_PAID":
        return "bg-emerald-500/10 border-emerald-500/35 text-emerald-400";
      case "CANCELLED":
        return "bg-red-500/10 border-red-500/35 text-red-400";
      default:
        return "bg-slate-500/10 border-slate-500/35 text-slate-400";
    }
  };

  const formatStatusText = (status: string) => {
    return status.replace("_", " ");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col font-sans">
      {/* Dashboard Top Header */}
      <header className="w-full border-b border-[var(--border)] bg-[#0d1e33]/40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Phoenix Moving Logo" className="h-9 object-contain" />
            <span className="text-lg font-bold tracking-wider text-[var(--primary)] uppercase">
              Phoenix Controls
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <span className="text-xs text-slate-400 block">Logged in as</span>
              <span className="text-sm font-semibold text-white">{user?.email || "Administrator"}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold bg-red-950/40 text-red-400 border border-red-900 rounded py-1.5 px-4 transition hover:bg-red-900/20"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">Bookings Log</h1>
            <p className="text-sm text-slate-400">Review scheduled moving requests, payment history, and Jobber synchronization status.</p>
          </div>
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="self-start sm:self-center text-xs font-bold border border-[var(--border)] rounded py-2 px-4 transition hover:bg-white/5 disabled:opacity-50"
          >
            {isLoading ? "Syncing..." : "Refresh Logs"}
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-lg border border-[var(--border)] bg-[#0d1e33]/50 p-5 shadow-sm">
            <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">Total Bookings</span>
            <span className="text-3xl font-extrabold text-white">{totalBookings}</span>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-[#0d1e33]/50 p-5 shadow-sm">
            <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">Completed Moves</span>
            <span className="text-3xl font-extrabold text-emerald-400">{completedMoves}</span>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-[#0d1e33]/50 p-5 shadow-sm">
            <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">Pending Deposits</span>
            <span className="text-3xl font-extrabold text-amber-400">{pendingDeposits}</span>
          </div>
          <div className="rounded-lg border border-[var(--border)] bg-[#0d1e33]/50 p-5 shadow-sm">
            <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">Total Revenue</span>
            <span className="text-3xl font-extrabold text-[var(--primary)]">${totalRevenue.toFixed(2)}</span>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="rounded-lg border border-[var(--border)] bg-[#0d1e33]/20 overflow-hidden shadow-xl">
          {isLoading ? (
            <div className="py-20 text-center text-slate-400">
              <div className="animate-spin size-8 border-4 border-[var(--primary)] border-t-transparent rounded-full mx-auto mb-4" />
              Loading database bookings log...
            </div>
          ) : bookings.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              No bookings found in the database. Go to the customer quote wizard to create bookings!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[#0d1e33]/60 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <th className="p-4">Customer</th>
                    <th className="p-4">Move Details</th>
                    <th className="p-4">Quote Sheet</th>
                    <th className="p-4">Pricing</th>
                    <th className="p-4">Jobber Sync</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] text-sm">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-white/2 transition duration-150">
                      {/* Customer Info */}
                      <td className="p-4">
                        <div className="font-bold text-white">
                          {booking.customer.firstName} {booking.customer.lastName}
                        </div>
                        <div className="text-xs text-slate-400">{booking.customer.email}</div>
                        <div className="text-xs text-slate-400">{booking.customer.phone}</div>
                      </td>

                      {/* Moving info */}
                      <td className="p-4">
                        <div className="font-medium text-slate-200">
                          {new Date(booking.requestedDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-slate-400 truncate max-w-xs">
                          {booking.customer.addressLine1}
                        </div>
                        <div className="text-xs text-slate-400">
                          {booking.quote.houseSize} ({booking.quote.rawInputs?.distance} mi)
                        </div>
                      </td>

                      {/* Quote source details */}
                      <td className="p-4 text-xs text-slate-300">
                        <div>Stairs: {booking.quote.rawInputs?.stairs || 0}</div>
                        <div>
                          Heavy:{" "}
                          {booking.quote.rawInputs?.heavyItems?.join(", ") || "None"}
                        </div>
                      </td>

                      {/* Pricing splits */}
                      <td className="p-4">
                        <div className="font-semibold text-white">${Number(booking.totalAmount).toFixed(2)}</div>
                        <div className="text-[10px] text-slate-400">
                          Deposit: ${Number(booking.depositAmount).toFixed(2)}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Balance: ${Number(booking.balanceAmount).toFixed(2)}
                        </div>
                      </td>

                      {/* Jobber Links */}
                      <td className="p-4 text-xs">
                        {booking.jobberJobId ? (
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                              <span className="size-1.5 bg-emerald-500 rounded-full animate-pulse" />
                              Synced
                            </div>
                            <div className="text-[10px] text-slate-400">Cust: {booking.customer.jobberCustomerId}</div>
                            <div className="text-[10px] text-slate-400">Job: {booking.jobberJobId}</div>
                          </div>
                        ) : (
                          <span className="text-slate-500 italic">Not Synced</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span
                          className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase ${getStatusBadgeClass(
                            booking.status
                          )}`}
                        >
                          {formatStatusText(booking.status)}
                        </span>
                      </td>

                      {/* Test Action Buttons */}
                      <td className="p-4 text-right">
                        {booking.status === "DEPOSIT_PENDING" && (
                          <button
                            onClick={() => handleMockPay(booking.id)}
                            disabled={isPayLoading}
                            className="text-xs bg-[var(--primary)] text-[var(--primary-foreground)] rounded font-semibold py-1 px-3 shadow transition hover:opacity-90 disabled:opacity-50"
                          >
                            {isPayLoading ? "Paying..." : "Mock Stripe Pay"}
                          </button>
                        )}

                        {booking.status === "SCHEDULED" && (
                          <div className="flex justify-end gap-2">
                            {booking.jobberJobId && (
                              <button
                                onClick={() => handleSimulateComplete(booking.jobberJobId!)}
                                disabled={isCompleteLoading || isOfflineLoading}
                                className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded font-semibold py-1 px-3 shadow transition disabled:opacity-50 cursor-pointer"
                              >
                                {isCompleteLoading ? "Syncing..." : "Simulate Job Done"}
                              </button>
                            )}
                            <button
                              onClick={() => handleCompleteOffline(booking.id)}
                              disabled={isCompleteLoading || isOfflineLoading}
                              className="text-xs bg-amber-600 hover:bg-amber-700 text-white rounded font-semibold py-1 px-3 shadow transition disabled:opacity-50 cursor-pointer"
                            >
                              {isOfflineLoading ? "Completing..." : "Paid Offline (Cash)"}
                            </button>
                          </div>
                        )}

                        {booking.status === "BALANCE_PAID" && (
                          <div className="text-emerald-400 flex items-center justify-end gap-1 font-semibold text-xs pr-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={3}
                              stroke="currentColor"
                              className="size-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                            Completed
                          </div>
                        )}

                        {!["DEPOSIT_PENDING", "SCHEDULED", "BALANCE_PAID"].includes(
                          booking.status
                        ) && <span className="text-slate-500 text-xs">-</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
