import CommonWrapper from "@/components/shared/CommonWrapper";
import CommonHeader from "@/components/shared/header/CommonHeader";
import CommonSpace from "@/components/shared/space/CommonSpace";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { navItems } from "./Navbar";

const contactInfo = [
  { icon: BsFillTelephoneFill, text: "602-921-5749" },
  { icon: MdOutlineEmail, text: "Aaaaaffordabl@gmail.com" },
  { icon: GoLocation, text: "Phoenix, Arizona" },
];
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div>
      <footer className="w-full  bg-[#03080F] ">
        <CommonSpace>
          <CommonWrapper>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 ">
              {/* Logo column */}
              <div className="md:col-span-2 space-y-4">
                <div className="space-y-2">
                  <div className="text-yellow text-lg sm:text-2xl  er font-bold">
                    <span className="text-yellow">AAAAA</span>
                    <span className="text-white">ffordable Moving</span>
                  </div>
                  <p className="text-sm text-offYellow tracking-wide">
                    Phoenix, Arizona · Local Flat Rates
                  </p>
                </div>
                <p className="text-sm text-offYellow tracking-wide max-w-sm leading-relaxed">
                  Licensed, insured, and locally operated. Serving homes,
                  apartments, businesses, seniors, and real estate professionals
                  across the Valley.
                </p>
              </div>

              {/* Link directory */}
              <div className="space-y-4">
                <CommonHeader size="sm" className="uppercase!">
                  Company
                </CommonHeader>
                <ul className="space-y-2 text-sm font-semibold text-offYellow tracking-wider">
                  {navItems.map((item) => (
                    <li
                      key={item.path}
                      className="cursor-pointer hover:text-yellow"
                      onClick={() => navigate(item.path)}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contacts info */}
              <div className=" space-y-4">
                <CommonHeader size="sm" className="uppercase!">
                  Contact
                </CommonHeader>
                <ul className="space-y-2 text-sm font-semibold text-offYellow tracking-wider">
                  {contactInfo.map(({ icon: Icon, text }, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <Icon className="text-offYellow" /> {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CommonWrapper>
        </CommonSpace>
        <div className="border-t border-yellow/20 text-center text-xs text-offYellow  tracking-widest py-4">
          <div className="w-full max-w-7xl mx-auto ">
            © 2026 AAAAAffordable Moving. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
