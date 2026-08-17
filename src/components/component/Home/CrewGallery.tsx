import delivery1 from "@/assets/images/delivery1.jpg";
import delivery2 from "@/assets/images/delivery2.jpg";
import delivery3 from "@/assets/images/delivery3.jpg";
import delivery4 from "@/assets/images/delivery4.jpg";
import delivery5 from "@/assets/images/delivery5.jpg";
import delivery6 from "@/assets/images/delivery6.jpg";
import CommonWrapper from "@/components/shared/CommonWrapper";
import SectionHeader from "@/components/shared/header/SectionHeader";
import CommonSpace from "@/components/shared/space/CommonSpace";
const CrewGallery = () => {
  return (
    <section className="">
      <CommonSpace>
        <CommonWrapper className="space-y-6">
          <SectionHeader subtitle="Our Crew" title=" Real Movers. Real Work." />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
            {[
              delivery1,
              delivery2,
              delivery3,
              delivery4,
              delivery5,
              delivery6,
            ].map((img, idx) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden h-60 relative group"
              >
                <img
                  src={img}
                  alt={`Crew work ${idx + 1}`}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </CommonWrapper>
      </CommonSpace>
    </section>
  );
};

export default CrewGallery;
