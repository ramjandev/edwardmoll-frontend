import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CommonButton from "./CommonButton";
import CommonHeader from "./CommonHeader";

interface ManagementHeaderProps {
  title: string;
  description?: string;
  className?: string;
  buttonOne?: string;
  actionOne?: () => void;
  buttonTwo?: string;
  actionTwo?: () => void;
  buttonThree?: string;
  actionThree?: () => void;
  descriptionClassName?: string;
  backButton?: boolean;
}

const DashboardTopSection: React.FC<ManagementHeaderProps> = ({
  title,
  description,
  className,
  buttonOne,
  actionOne,
  buttonTwo,
  actionTwo,
  buttonThree,
  actionThree,
  descriptionClassName,
  backButton = false,
}) => {
  const privacy = false;
  const navigate = useNavigate();
  return (
    <div
      className={`flex flex-col xl:flex-row items-start xl:items-end justify-between gap-6 pb-0 sm:pb-6   ${className} `}
    >
      <div className="space-y-1 flex gap-3 ">
        {backButton && (
          <p onClick={() => navigate(-1)} className="mt-3 cursor-pointer">
            <ArrowLeft className="w-5 h-5 text-[#5C7899] hover:text-[#111827]" />
          </p>
        )}
        <div>
          {title && <CommonHeader size="3xl">{title}</CommonHeader>}

          {description && (
            <div className="w-full ">
              <CommonHeader size="md" className={`${descriptionClassName} `}>
                {description}
              </CommonHeader>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4.5 items-center w-full sm:w-auto">
        {buttonThree && (
          <CommonButton
            variant="secondary"
            onClick={actionThree}
            size="lg"
            className="text-blue"
          >
            {privacy ? <EyeOff /> : <Eye />}
            {buttonThree}
          </CommonButton>
        )}

        {buttonTwo && (
          <CommonButton variant="secondary" onClick={actionTwo} size="lg">
            <FiUserPlus />
            {buttonTwo}
          </CommonButton>
        )}

        {buttonOne && (
          <CommonButton showDefaultIcon onClick={actionOne} size="lg">
            {buttonOne}
          </CommonButton>
        )}
      </div>
    </div>
  );
};
export default DashboardTopSection;
