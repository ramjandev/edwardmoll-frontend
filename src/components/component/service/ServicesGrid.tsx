import {
  Armchair,
  Building2,
  HeartHandshake,
  House,
  Truck,
  Warehouse,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import FeatureCard from "@/components/shared/card/FeatureCard";

const services = [
  {
    title: "Apartment Moving",
    description:
      "Studios, walk-ups, and high-rises across the Valley. We coordinate elevator reservations, loading docks, and building rules so move day stays on schedule.",
    icon: <Building2 className="size-6" />,
  },
  {
    title: "Residential Moving",
    description:
      "From condos to full single-family homes. Careful pad-wrapping, disassembly and reassembly, and a flat rate quoted before we start.",
    icon: <House className="size-6" />,
  },
  {
    title: "Senior Moves",
    description:
      "Patient, respectful help with downsizing, unpacking, and setting up a new home. We work at your pace and treat every item with care.",
    icon: <HeartHandshake className="size-6" />,
  },
  {
    title: "Storage Moves",
    description:
      "Into a unit, out of a unit, or between two units. Skip the hourly rental – we bring the truck, muscle, and materials.",
    icon: <Warehouse className="size-6" />,
  },
  {
    title: "Loading & Unloading",
    description:
      "Renting your own truck or shipping container? Our crew loads it tight and safe, or unloads at your destination.",
    icon: <Truck className="size-6" />,
  },
  {
    title: "Furniture Relocation",
    description:
      "Rearranging a room, moving a few big pieces across town, or picking up a marketplace find. In and out, same day.",
    icon: <Armchair className="size-6" />,
  },
];

const ServicesGrid = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <FeatureCard
            key={service.title}
            title={service.title}
            description={service.description}
            icon={service.icon}
            onClick={() => navigate("/quote")}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesGrid;
