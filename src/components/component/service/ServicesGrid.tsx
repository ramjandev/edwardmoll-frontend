import * as LucideIcons from "lucide-react";
import { useGetServicesQuery } from "@/store/services/servicesApi";
import FeatureCard from "@/components/shared/card/FeatureCard";

const IconRender = ({ name }: { name?: string }) => {
  const IconComponent = (LucideIcons as any)[name || "Box"] || LucideIcons.Box;
  return <IconComponent className="size-6" />;
};

const ServicesGrid = () => {
  const { data: rawServices = [], isLoading } = useGetServicesQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40 text-offYellow">
        Loading services...
      </div>
    );
  }

  const services = Array.isArray(rawServices) ? rawServices : [];

  // Filter active and sort by sortOrder
  const sortedServices = [...services]
    .filter((s) => s.isActive !== false)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  if (sortedServices.length === 0) {
    return (
      <div className="text-center py-12 bg-[#0d1e33] border border-border rounded-xl text-offYellow">
        No active services currently listed. Check back soon or contact us directly at 602-921-5749!
      </div>
    );
  }

  return (
    <section>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedServices.map((service) => (
          <FeatureCard
            key={service.id || service._id}
            title={service.title}
            description={service.description}
            icon={<IconRender name={service.icon} />}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesGrid;
