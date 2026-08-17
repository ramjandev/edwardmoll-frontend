import CommonButton from "@/components/shared/button/CommonButton";
import { motion } from "framer-motion";

const BannerCTA = () => {
  return (
    <section className="">
      <div className="rounded-lg border border-yellow/30 hover:border-yellow bg-[#010203] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl transition-all duration-200">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-sm font-black uppercase tracking-widest text-yellow">
            Instant Quote
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase">
            Get a real price in
            <span className="text-yellow"> under a minute.</span>
          </h3>
          <p className="text-base text-offYellow">
            Seven quick questions. No name, phone, or email required.
          </p>
        </div>

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

          <CommonButton size="xl" to="/quote">
            Build My Instant Quote
          </CommonButton>
        </motion.div>
      </div>
    </section>
  );
};

export default BannerCTA;
