import PhoneActionButton from "@/components/shared/button/PhoneActionButton";
import FeatureCard from "@/components/shared/card/FeatureCard";
import CommonWrapper from "@/components/shared/CommonWrapper";
import SectionHeader from "@/components/shared/header/SectionHeader";
import CommonSpace from "@/components/shared/space/CommonSpace";
import { CgCalculator } from "react-icons/cg";
import { FaRegHandshake, FaRegStar } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { LuDollarSign } from "react-icons/lu";

const features = [
  {
    title: "FLAT RATES, NO SURPRISES",
    desc: "You know the price before we load the truck. Not by the hour.",
    icon: <LuDollarSign />,
  },
  {
    title: "LOCALLY OWNED",
    desc: "Phoenix crew that treats your stuff like it's ours.",
    icon: <FaRegHandshake />,
  },
  {
    title: "INSTANT ONLINE QUOTE",
    desc: "Answer 7 quick questions – get a real number. No contact info needed.",
    icon: <CgCalculator />,
  },
  {
    title: "HONEST AND HARDWORKING",
    desc: "We show up, work hard, and earn your trust with every box.",
    icon: <FaRegStar />,
  },
  {
    title: "FAST BUT CAREFUL",
    desc: "Efficient moving that protects your furniture and your floors.",
    icon: <IoShieldCheckmarkOutline />,
  },
  {
    title: "FRIENDLY AND CARING",
    desc: "Respectful movers who treat your family and belongings right.",
    icon: <FiUsers />,
  },
];
const WhySection = () => {
  return (
    <section className="  bg-[#040C16] ">
      <CommonSpace>
        <CommonWrapper className="space-y-6">
          <SectionHeader
            subtitle="Why AAAAAffordable"
            title="Movers You Can Actually Afford."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feat) => (
              <FeatureCard
                key={feat.title}
                title={feat.title}
                description={feat.desc}
                icon={feat.icon}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6">
            <PhoneActionButton />
          </div>
        </CommonWrapper>
      </CommonSpace>
    </section>
  );
};

export default WhySection;
