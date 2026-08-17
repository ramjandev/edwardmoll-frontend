import CommonButton from "@/components/shared/button/CommonButton";
import CommonWrapper from "@/components/shared/CommonWrapper";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export const navItems = [
  { label: "Home", path: "/" },
  { label: "Instant Quote", path: "/quote" },
  { label: "Services", path: "/services" },
  { label: "Realtors & Leasing", path: "/realtors" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[#071425]/90 backdrop-blur">
      <CommonWrapper className="">
        <div className="flex items-center justify-between gap-6 h-18">
          <Link className="flex items-center gap-3 cursor-pointer" to="/">
            <div className="flex items-baseline gap-2">
              <span className="text-yellow text-lg sm:text-2xl leading-none er font-bold">
                AAAAA<span className="text-white">ffordable</span>
              </span>
              <span className="text-offYellow uppercase text-xs tracking-wider">
                Moving
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 text-sm font-semibold text-offYellow tracking-wider lg:flex">
            {navItems.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 transition duration-200 ${
                    isActive ? "bg-yellow text-black" : "hover:text-yellow"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <CommonButton showDefaultIcon to="tel:602-921-5749">
              602-921-5749
            </CommonButton>
          </div>

          <div className="flex items-center lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className="text-offYellow hover:text-yellow transition duration-200 cursor-pointer"
                >
                  <Menu className="h-7 w-7" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[#071425] border-border text-offYellow "
              >
                <nav className="mt-10 flex flex-col  text-sm font-semibold tracking-wider">
                  {navItems.map(({ label, path }) => (
                    <SheetClose asChild key={path}>
                      <NavLink
                        to={path}
                        className={({ isActive }) =>
                          `transition duration-200 hover:bg-yellow hover:text-black p-3 flex items-center justify-center ${
                            isActive
                              ? "bg-yellow text-black"
                              : "hover:text-yellow"
                          }`
                        }
                      >
                        {label}
                      </NavLink>
                    </SheetClose>
                  ))}
                </nav>

                <div className="w-full">
                  <CommonButton
                    showDefaultIcon
                    to="tel:602-921-5749"
                    className="rounded-none w-full!"
                  >
                    602-921-5749
                  </CommonButton>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CommonWrapper>
    </header>
  );
};

export default Navbar;
