import PhoneActionButton from "@/components/shared/button/PhoneActionButton";
import CommonWrapper from "@/components/shared/CommonWrapper";
import SectionHeader from "@/components/shared/header/SectionHeader";
import CommonSpace from "@/components/shared/space/CommonSpace";

const cities = [
  "Phoenix",
  "Scottsdale",
  "Tempe",
  "Mesa",
  "Chandler",
  "Gilbert",
  "Glendale",
  "Peoria",
  "Surprise",
  "Avondale",
  "Goodyear",
  "Sun City",
];
const ServiceArea = () => {
  return (
    <section className=" bg-[#071425]">
      <CommonSpace>
        <CommonWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-3">
                <SectionHeader
                  subtitle="Serving the entire Phoenix Metro."
                  title="Service Area"
                  des="If you're moving in the Valley of the Sun, we've got you
                  covered."
                />
              </div>

              <div className="flex flex-wrap gap-2.5">
                {cities.map((city) => (
                  <span
                    key={city}
                    className="rounded-full bg-[#121C26] border border-yellow/20 px-4 py-1.5 text-sm font-bold text-yellow"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col  items-end justify-end gap-4 sm:gap-6 ">
              <PhoneActionButton />
            </div>
          </div>
        </CommonWrapper>
      </CommonSpace>
    </section>
  );
};

export default ServiceArea;
