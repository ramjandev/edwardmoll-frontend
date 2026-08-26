import CommonButton from "@/components/shared/button/CommonButton";
import CommonWrapper from "@/components/shared/CommonWrapper";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";

export const navItems = [
  { label: "Home", path: "/" },
  { label: "Instant Quote", path: "/quote" },
  { label: "Services", path: "/services" },
  { label: "Realtors & Leasing", path: "/realtors" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const { pathname } = useLocation();
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
                    isActive ? "text-yellow " : "hover:text-yellow"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <motion.div
              className="relative w-full"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Animated glow */}
              <motion.div
                className="absolute -inset-1 rounded-md blur-md pointer-events-none"
                animate={{
                  opacity: [0.2, 0.7, 0.2],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Shine sweep */}
              <motion.div className="absolute inset-0 overflow-hidden rounded-md pointer-events-none">
                <motion.div
                  className="absolute top-0 -left-[100%] h-full w-[60%] skew-x-[-20deg] bg-white/20"
                  animate={{ left: ["-100%", "160%"] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              <CommonButton showDefaultIcon to="tel:602-921-5749">
                602-921-5749
              </CommonButton>
            </motion.div>
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
                <nav className="mt-10 flex flex-col gap-1 text-sm font-semibold tracking-wider">
                  {navItems.map(({ label, path }) => {
                    const isActive = pathname === path;

                    return (
                      <SheetClose asChild key={path}>
                        <NavLink
                          to={path}
                          className={`flex items-center justify-center p-3 transition duration-200 ${
                            isActive
                              ? "bg-yellow text-black"
                              : "text-offYellow hover:bg-yellow hover:text-black"
                          }`}
                        >
                          {label}
                        </NavLink>
                      </SheetClose>
                    );
                  })}
                </nav>

                <div className="w-full">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Animated glow */}
                    <motion.div
                      className="absolute -inset-1 rounded-md blur-md pointer-events-none"
                      animate={{
                        opacity: [0.2, 0.7, 0.2],
                        scale: [0.95, 1.05, 0.95],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Shine sweep */}
                    <motion.div className="absolute inset-0 overflow-hidden rounded-md pointer-events-none">
                      <motion.div
                        className="absolute top-0 -left-[100%] h-full w-[60%] skew-x-[-20deg] bg-white/20"
                        animate={{ left: ["-100%", "160%"] }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          repeatDelay: 1.5,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>

                    <CommonButton
                      showDefaultIcon
                      to="tel:602-921-5749"
                      className="rounded-none w-full!"
                    >
                      602-921-5749
                    </CommonButton>
                  </motion.div>
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
