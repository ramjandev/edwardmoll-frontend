import heroImg from "@/assets/images/hero.jpg";
import logoImg from "@/assets/images/logo.png";
import PhoneActionButton from "@/components/shared/button/PhoneActionButton";
import { IoLocationOutline } from "react-icons/io5";

const HomeHero = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 bg-black lg:h-[calc(100vh-76px)] w-full">
      <div className="w-full flex flex-col items-center justify-center border-yellow px-4 py-10 sm:py-14 lg:py-0 lg:border-r-5">
        <div className="space-y-4 w-full">
          <img
            src={logoImg}
            alt="AAAAAffordable Moving Big"
            className="w-full max-w-[220px] sm:max-w-[300px] lg:max-w-130 object-contain mx-auto"
          />

          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-fit flex items-center gap-2 bg-[#221A09] px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-xs sm:text-sm font-semibold tracking-wider text-yellow uppercase text-center">
              <IoLocationOutline className="shrink-0" /> Phoenix, Arizona •
              Flat-Rate Movers
            </div>

            <div className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight sm:leading-none text-white text-center">
              Moving Services <br /> Across
              <span className="text-yellow ml-1">Phoenix</span> & Beyond
            </div>
            <p className="text-xs sm:text-sm font-semibold tracking-wider text-yellow uppercase text-center">
              Price in under 60 seconds • No contact info required
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center pt-6 w-full ">
          <PhoneActionButton />
        </div>
      </div>

      <div className="h-[300px] sm:h-[400px] lg:h-full overflow-hidden">
        <img
          src={heroImg}
          alt="Affordable Moving Truck loading"
          className="w-full object-cover h-full"
        />
      </div>
    </section>
  );
};

export default HomeHero;
