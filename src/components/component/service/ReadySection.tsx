import PhoneActionButton from "@/components/shared/button/PhoneActionButton";
import CommonWrapper from "@/components/shared/CommonWrapper";
import SectionHeader from "@/components/shared/header/SectionHeader";
import CommonSpace from "@/components/shared/space/CommonSpace";

const ReadySection = () => {
  return (
    <div className="bg-[#040C16] ">
      <CommonSpace>
        <CommonWrapper className=" max-w-7xl! mx-auto flex flex-col items-center justify-center  ">
          <SectionHeader
            subtitle="Ready When You Are"
            title="See Your Flat Rate Now."
            des="Answer 7 quick questions to get an instant estimate. No contact info
            required."
            className="text-center flex flex-col items-center space-y-4"
          />

          <div className="flex  items-center justify-center  pt-6 w-full">
            <PhoneActionButton />
          </div>
        </CommonWrapper>
      </CommonSpace>
    </div>
  );
};

export default ReadySection;
