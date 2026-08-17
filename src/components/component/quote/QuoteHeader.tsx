import { motion } from "framer-motion";

const QuoteHeader = () => {
  return (
    <section className="max-w-6xl mx-auto text-center space-y-6 font-barlow">
      <h3 className="text-sm font-black uppercase tracking-[4px] text-yellow">
        Instant Quote
      </h3>

      <motion.h1
        className="text-4xl sm:text-[128px] font-black uppercase text-transparent bg-clip-text bg-[length:200%_100%]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #f5c542 0%, #f5c542 35%, #fff8e1 50%, #f5c542 65%, #f5c542 100%)",
        }}
        animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        Build your flat-rate quote
      </motion.h1>

      <p className="text-lg text-offYellow leading-relaxed max-w-xl mx-auto">
        No sign-up. No spam. Just an honest number before you commit to
        anything.
      </p>
    </section>
  );
};

export default QuoteHeader;
