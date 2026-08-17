import PhoneActionButton from "@/components/shared/button/PhoneActionButton";
import CommonWrapper from "@/components/shared/CommonWrapper";
import SectionHeader from "@/components/shared/header/SectionHeader";
import CommonSpace from "@/components/shared/space/CommonSpace";

const AboutCTA = () => {
  return (
    <section className="bg-[#040C16]">
      <CommonSpace>
        <CommonWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ">
            <div className="lg:col-span-7 space-y-4">
              <SectionHeader
                title="  The price we quote is the price you pay."
                subtitle="What We Promise"
                des="No hourly meter running. No hidden fees for stairs, long
                carries, or heavy items unless we discuss it up front. If our
                flat rate isn't right for your move, we'll tell you before we
                start."
              />
            </div>

            <div className="lg:col-span-5 rounded-lg border border-yellow/30 bg-[#0d1e33]/50 p-8 space-y-6 text-center shadow-lg">
              <SectionHeader
                title="Ready to Move ?"
                des="Get an instant flat-rate quote or call us directly."
              />
              <div className="space-y-3">
                <PhoneActionButton />
              </div>
            </div>
          </div>
        </CommonWrapper>
      </CommonSpace>
    </section>
  );
};

export default AboutCTA;
