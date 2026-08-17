import CommonWrapper from "@/components/shared/CommonWrapper";
import SectionHeader from "@/components/shared/header/SectionHeader";
import CommonSpace from "@/components/shared/space/CommonSpace";
import { VscStarFull } from "react-icons/vsc";

const reviews = [
  {
    text: '"Quoted the price online, and that\'s exactly what I paid. Crew was fast and respectful of my furniture."',
    author: "Marisol A.",
    info: "2BR apartment - Central Phoenix",
  },
  {
    text: '"We use them for every tenant turnover. They\'re on time, careful, and our residents love them."',
    author: "Devon R.",
    info: "Property Manager - Scottsdale",
  },
  {
    text: '"They helped my mom downsize with so much patience. Best moving decision we made."',
    author: "Karen L.",
    info: "Senior move - Sun City",
  },
];
const ReviewsSection = () => {
  return (
    <section className="py-10 bg-[#040C16]">
      <CommonSpace>
        <CommonWrapper className="space-y-6">
          <SectionHeader
            subtitle="Phoenix Families & Pros Trust Us."
            title="Reviews"
          />

          {/* Cards row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.author}
                className="rounded-lg border border-yellow/20 bg-[#0d1e33]/40 p-6 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex gap-1 text-yellow text-xl">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <VscStarFull key={i} />
                      ))}
                  </div>
                  <p className="text-sm text-white leading-relaxed">
                    {rev.text}
                  </p>
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">
                    {rev.author}
                  </div>
                  <div className="text-xs text-offYellow mt-0.5">
                    {rev.info}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CommonWrapper>
      </CommonSpace>
    </section>
  );
};

export default ReviewsSection;
