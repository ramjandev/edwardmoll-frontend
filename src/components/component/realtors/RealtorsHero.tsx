import PhoneActionButton from "@/components/shared/button/PhoneActionButton";
import CommonHeroSection from "@/components/shared/CommonHeroSection";
import CommonWrapper from "@/components/shared/CommonWrapper";
import CommonSpace from "@/components/shared/space/CommonSpace";

const RealtorsHero = () => {
  return (
    <div className="">
      <CommonSpace>
        <CommonWrapper>
          <CommonHeroSection
            title="For Real Estate & Leasing Pros"
            blackText=" Helping Leasing and Real Estate Agents"
            yellowText="Keep Properties Moving."
            description="A dependable Phoenix moving partner for your turnovers,
            new-resident welcomes, staging, and property prep – with flat
            rates your team can quote confidently."
          />

          <div className="flex  items-center justify-center  pt-6">
            <PhoneActionButton />
          </div>
        </CommonWrapper>
      </CommonSpace>
    </div>
  );
};

export default RealtorsHero;
