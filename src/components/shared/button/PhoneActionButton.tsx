import { motion } from "framer-motion";
import CommonButton from "./CommonButton";

const PhoneActionButton = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
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
            className="absolute top-0 -left-[100%] h-full w-[60%] skew-x-[-20deg] bg-yellow/50"
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
          size="xl"
          href="tel:602-921-5749"
          showDefaultIcon
          variant="outline"
        >
          602-921-5749
        </CommonButton>
      </motion.div>
    </div>
  );
};

export default PhoneActionButton;
