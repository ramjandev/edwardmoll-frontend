import { FaDollarSign } from "react-icons/fa";
import { MdOutlineLocalShipping } from "react-icons/md";
import { WiTime4 } from "react-icons/wi";

const ribbonItems = [
  {
    icon: FaDollarSign,
    title: "Flat Rates",
    subtitle: "No surprises at checkout",
  },
  {
    icon: WiTime4,
    title: "On-Time, Every Time",
    subtitle: "Phoenix reliability",
  },
  {
    icon: MdOutlineLocalShipping,
    title: "Phoenix Local",
    subtitle: "Locally owned operations",
  },
];

const BannerRibbons = () => {
  return (
    <section className="w-full bg-[#040C16]">
      <div className="grid grid-cols-1 divide-y divide-yellow/40 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
        {ribbonItems.map(({ icon: Icon, title, subtitle }) => (
          <div
            key={title}
            className="flex flex-col items-center justify-center gap-1 px-4 py-3 text-center sm:py-4"
          >
            <span className="flex items-center justify-center gap-1.5 text-sm font-black text-yellow sm:text-base md:text-lg">
              <Icon className="shrink-0" />
              {title}
            </span>
            <span className="text-[10px] uppercase text-offYellow sm:text-xs">
              {subtitle}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BannerRibbons;
