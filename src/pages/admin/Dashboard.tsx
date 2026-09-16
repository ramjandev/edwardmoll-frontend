import { motion } from "framer-motion";
import { FileText, ImageIcon, MessageSquare, Wrench } from "lucide-react";
import { useGetDashboardQuery } from "../../store/admin/adminApi";

const Dashboard = () => {
  const { data: stats, isLoading, error } = useGetDashboardQuery();

  if (isLoading) {
    return <div className="text-offYellow">Loading dashboard...</div>;
  }

  if (error || !stats) {
    return (
      <div className="text-red-400">
        Failed to load dashboard data. Please try again later.
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Services",
      value: stats.servicesCount ?? stats.totalServices ?? 0,
      icon: Wrench,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      title: "Gallery Images",
      value: stats.galleryCount ?? stats.totalGalleryImages ?? 0,
      icon: ImageIcon,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      title: "Published Posts",
      value: stats.postsCount ?? stats.totalPublishedPosts ?? 0,
      icon: FileText,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      title: "Unread Inquiries",
      value: stats.unreadInquiriesCount ?? stats.unreadInquiries ?? 0,
      icon: MessageSquare,
      color: "text-rose-400",
      bg: "bg-rose-400/10",
    },
  ];

  return (
    <div className="w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-barlow font-bold uppercase tracking-wide text-white">
          Dashboard
        </h1>
        <p className="text-offYellow mt-1">
          Welcome to the AAAAAffordable Moving admin panel.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={card.title}
              className="bg-[#0d1e33] border border-border rounded-xl p-6 flex items-center gap-4 shadow-sm"
            >
              <div className={`p-4 rounded-lg ${card.bg}`}>
                <Icon className={`w-8 h-8 ${card.color}`} />
              </div>
              <div>
                <p className="text-sm text-offYellow uppercase tracking-wider font-semibold mb-1">
                  {card.title}
                </p>
                <h3 className="text-3xl font-bold text-white">{card.value}</h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
