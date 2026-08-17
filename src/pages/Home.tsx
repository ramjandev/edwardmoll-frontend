import BannerRibbons from "@/components/component/Home/BannerRibbons";
import CrewGallery from "@/components/component/Home/CrewGallery";
import HomeHero from "@/components/component/Home/HomeHero";
import MoveSection from "@/components/component/Home/MoveSection";
import ReviewsSection from "@/components/component/Home/ReviewsSection";
import ServiceArea from "@/components/component/Home/ServiceArea";
import WhySection from "@/components/component/Home/WhySection";

const Home = () => {
  return (
    <div className="">
      <HomeHero />
      <BannerRibbons />
      <MoveSection />
      <WhySection />
      <CrewGallery />
      <ReviewsSection />
      <ServiceArea />
    </div>
  );
};

export default Home;
