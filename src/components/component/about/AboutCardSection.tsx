import FeatureCard from "@/components/shared/card/FeatureCard";
import CommonWrapper from "@/components/shared/CommonWrapper";
import { BadgeDollarSign, HeartHandshake, MapPin, Star } from "lucide-react";

const values = [
  {
    title: "HONEST PRICING",
    description: "Flat rates you see up front. What we quote is what you pay.",
    icon: BadgeDollarSign,
  },
  {
    title: "RESPECT FOR YOUR STUFF",
    description: "Pad-wrapped, carefully loaded, delivered right – every time.",
    icon: HeartHandshake,
  },
  {
    title: "PHOENIX THROUGH AND THROUGH",
    description:
      "We live here. We know the buildings, the traffic, and the heat.",
    icon: MapPin,
  },
  {
    title: "5-STAR STANDARD",
    description:
      "Show up on time, work hard, leave happy customers. Every move.",
    icon: Star,
  },
];

const AboutCardSection = () => {
  return (
    <section className="">
      <CommonWrapper>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <FeatureCard
                key={value.title}
                title={value.title}
                description={value.description}
                icon={<Icon size={22} strokeWidth={2} />}
                className="h-full"
              />
            );
          })}
        </div>
      </CommonWrapper>
    </section>
  );
};

export default AboutCardSection;
