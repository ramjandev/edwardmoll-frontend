import CommonButton from "@/components/shared/button/CommonButton";
import CommonWrapper from "@/components/shared/CommonWrapper";
import SectionHeader from "@/components/shared/header/SectionHeader";
import CommonSpace from "@/components/shared/space/CommonSpace";
import { HiOutlineMail } from "react-icons/hi";

const BottomProgram = () => {
  return (
    <section className="bg-[#040C16]">
      <CommonSpace>
        <CommonWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center  ">
            <div className="lg:col-span-7 space-y-4">
              <SectionHeader
                title="Priority scheduling for your team."
                subtitle="Partner Program"
                des="If you're managing multiple units or running an active book of listings, we'll set up a dedicated point of contact, volume pricing, and preferred move slots."
              />
            </div>

            <div className="lg:col-span-5 rounded-lg border border-yellow/30 bg-[#0d1e33]/50 p-4 sm:p-8 space-y-6 text-center shadow-lg flex flex-col items-center justify-center">
              <SectionHeader
                title="Get Set Up"
                des="Call our Realtor desk and we'll build a plan for your
                  properties."
              />

              <div className=" flex flex-col sm:flex-row gap-4 items-center justify-center w-full ">
                <CommonButton
                  variant="outline"
                  size="xl"
                  href="tel:602-921-5749"
                  showDefaultIcon
                >
                  602-921-5749
                </CommonButton>
                <CommonButton to="/contact" size="xl">
                  <HiOutlineMail />
                  Email Us
                </CommonButton>
              </div>
            </div>
          </div>
        </CommonWrapper>
      </CommonSpace>
    </section>
  );
};

export default BottomProgram;
