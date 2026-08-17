import CommonHeroSection from "@/components/shared/CommonHeroSection";
import CommonWrapper from "@/components/shared/CommonWrapper";
import CommonSpace from "@/components/shared/space/CommonSpace";

const ContactHero = () => {
  return (
    <section className="">
      <CommonSpace>
        <CommonWrapper>
          <CommonHeroSection
            title="Contact"
            blackText="Let's Talk About Your"
            yellowText="Move."
            description="Call, email, or send us the details – a moving specialist responds
        within one business hour."
          />
        </CommonWrapper>
      </CommonSpace>
    </section>
  );
};

export default ContactHero;
