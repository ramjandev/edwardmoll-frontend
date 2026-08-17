import CommonHeroSection from "@/components/shared/CommonHeroSection";
import CommonWrapper from "@/components/shared/CommonWrapper";
import CommonSpace from "@/components/shared/space/CommonSpace";
import AboutCardSection from "./AboutCardSection";

const AboutHero = () => {
  return (
    <div className="">
      <CommonSpace>
        <CommonWrapper>
          <CommonHeroSection
            title="About Us"
            blackText="A Phoenix moving company"
            yellowText="built on trust"
            description="  AAAAAffordable Moving is a locally owned, flat-rate moving company
              serving Phoenix and the entire Valley. We started with a simple
              idea: moving shouldn't be expensive, stressful, or full of
              surprises. Honest prices, careful crews, and clear communication —
              every move."
          />
          <AboutCardSection />
        </CommonWrapper>
      </CommonSpace>
    </div>
  );
};

export default AboutHero;
