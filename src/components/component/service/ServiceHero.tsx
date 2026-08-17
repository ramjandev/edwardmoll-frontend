import PhoneActionButton from "@/components/shared/button/PhoneActionButton";
import CommonHeroSection from "@/components/shared/CommonHeroSection";
import CommonWrapper from "@/components/shared/CommonWrapper";
import CommonSpace from "@/components/shared/space/CommonSpace";
import ServicesGrid from "./ServicesGrid";

const ServiceHero = () => {
  return (
    <CommonSpace>
      <CommonWrapper className="  ">
        <CommonHeroSection
          title="Services"
          blackText="Every Phoenix Move,"
          yellowText="Done Right."
          description="Full-service local moving with honest flat rates. Pick your move
            type below – or skip ahead and build a quote."
        />
        <div className="flex  items-center justify-center gap-4 mb-10  sm:mb-16">
          <PhoneActionButton />
        </div>

        <ServicesGrid />
      </CommonWrapper>
    </CommonSpace>
  );
};

export default ServiceHero;
