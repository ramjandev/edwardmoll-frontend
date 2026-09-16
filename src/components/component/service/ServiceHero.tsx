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
            type below."
        />
        <div className="flex  items-center justify-center gap-4 mb-10  sm:mb-16">
        </div>

        <ServicesGrid />
      </CommonWrapper>
    </CommonSpace>
  );
};

export default ServiceHero;
