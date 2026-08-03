import logo from "@/assets/images/logo.png";
import { useGetMeQuery } from "@/store/Auth/authApi";
import { FaArrowLeft } from "react-icons/fa6";
import CommonHeader from "../shared/CommonHeader";

const LogoWithSearch = () => {
  const { data } = useGetMeQuery();
  return (
    <div>
      <div className="w-full flex justify-center items-center pb-8">
        <div className="w-32.5 h-25 ">
          <img className="w-full h-full object-cover " src={logo} alt="logo" />
        </div>
      </div>
      <div className="flex justify-between items-center gap-3 mb-6 pl-5">
        <div className="relative">
          <img
            src={data?.data?.profileImage || " https://i.pravatar.cc/100"}
            className="w-16 h-16 rounded-full object-cover ring-3 ring-[#E6EBF2] ring-offset-6"
          />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#17E933] rounded-full"></span>
        </div>
        <div>
          <CommonHeader size="md" className="font-semibold! text-[#294566]!">
            {data?.data?.name}
          </CommonHeader>
          <CommonHeader size="xs" className="font-semibold!">
            {data?.data?.email}
          </CommonHeader>
        </div>
        <div className="rounded-l-[100px] border-2 border-[#44AA5C] bg-[#50BB69] shadow-[inset_0_10px_10px_0_rgba(0,0,0,0.10)] w-12.5 h-12.5 flex items-center justify-center">
          <FaArrowLeft className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="p-4" />
    </div>
  );
};

export default LogoWithSearch;
