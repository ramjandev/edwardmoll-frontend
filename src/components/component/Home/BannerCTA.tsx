import CommonButton from "@/components/shared/button/CommonButton";
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

        <CommonButton to="/quote" size="xl" className="">
          Build My Instant Quote
        </CommonButton>
      </div>
    </section>
  );
};

export default BannerCTA;
