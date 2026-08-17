import StatsCard from "@/components/shared/card/StatsCard";
import CommonWrapper from "@/components/shared/CommonWrapper";
import SectionHeader from "@/components/shared/header/SectionHeader";
import CommonSpace from "@/components/shared/space/CommonSpace";
import { Building2, Home } from "lucide-react";
import { BsBoxSeam, BsStars } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import BannerCTA from "./BannerCTA";

const services = [
  {
    title: "APARTMENT MOVING",
    desc: "Studios to high-rises across the Valley. Fast, careful, flat-rate.",
    icon: <Building2 className=" size-8" />,
  },
  {
    title: "RESIDENTIAL MOVING",
    desc: "Single-family homes packed, loaded, and delivered right.",
    icon: <Home className=" size-8" />,
  },
  {
    title: "SENIOR MOVES",
    desc: "Patient, respectful help with downsizing and settling in.",
    icon: <HiUsers className=" size-8" />,
  },
  {
    title: "STORAGE MOVES",
    desc: "In, out, or between units – we handle the heavy lifting.",
    icon: <BsBoxSeam className=" size-8" />,
  },
  {
    title: "LOADING & UNLOADING",
    desc: "Already have a truck? We'll load or unload it professionally.",
    icon: <MdOutlineLocalShipping className=" size-8" />,
  },
  {
    title: "FURNITURE RELOCATION",
    desc: "Rearranging or moving a few big pieces – done in one trip.",
    icon: <BsStars className=" size-8" />,
  },
];
const MoveSection = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#071425]">
      <CommonSpace>
        <CommonWrapper className="space-y-6">
          <SectionHeader
            subtitle="What We Move"
            title="Wide Variety of Local Moves"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <StatsCard key={svc.title} {...svc} />
            ))}
          </div>

          <div className="text-center pt-2">
            <span
              onClick={() => navigate("/quote")}
              className="text-xs font-black text-yellow hover:underline cursor-pointer uppercase tracking-widest"
            >
              See All Services →
            </span>
          </div>
          <BannerCTA />
        </CommonWrapper>
      </CommonSpace>
    </div>
  );
};

export default MoveSection;
