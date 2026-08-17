import {
  ClipboardList,
  Handshake,
  KeyRound,
  Sofa,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import FeatureCard from "@/components/shared/card/FeatureCard";
import CommonWrapper from "@/components/shared/CommonWrapper";
import SectionHeader from "@/components/shared/header/SectionHeader";
import CommonSpace from "@/components/shared/space/CommonSpace";

const handleItems = [
  {
    title: "Tenant Move-Outs",
    description:
      "Fast, clean move-outs so units turn on schedule. We coordinate directly with your team.",
    icon: <KeyRound className="size-6" />,
  },
  {
    title: "New Resident Move-Ins",
    description:
      "Concierge-style welcome moves – a differentiator your leasing team can offer prospects.",
    icon: <UsersRound className="size-6" />,
  },
  {
    title: "Furniture Relocation",
    description:
      "Model unit refreshes, on-site inventory shuffles, and last-minute room resets.",
    icon: <Sofa className="size-6" />,
  },
  {
    title: "Property Preparation",
    description:
      "Removals, hauling, and staging support to get a listing photo-ready.",
    icon: <ClipboardList className="size-6" />,
  },
  {
    title: "Staging Support",
    description:
      "Deliver, place, and pick up staging inventory on your timeline.",
    icon: <Sparkles className="size-6" />,
  },
  {
    title: "Community Partnerships",
    description:
      "Volume pricing and priority scheduling for property management groups.",
    icon: <Handshake className="size-6" />,
  },
];

const HandleItems = () => {
  const navigate = useNavigate();

  return (
    <section className="">
      <CommonSpace style="bottom">
        <CommonWrapper className="space-y-6">
          <SectionHeader
            title="Everything your properties need – one crew, one call."
            subtitle=" What We Handle"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {handleItems.map((item) => (
              <FeatureCard
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
                onClick={() => navigate("/quote")}
              />
            ))}
          </div>
        </CommonWrapper>
      </CommonSpace>
    </section>
  );
};

export default HandleItems;
