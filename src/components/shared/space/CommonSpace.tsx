interface CommonSpaceProps {
  children: React.ReactNode;
  className?: string;
  style?: "vertical" | "bottom";
}
const CommonSpace: React.FC<CommonSpaceProps> = ({
  children,
  className,
  style = "vertical",
}) => {
  return (
    <div
      className={`w-full ${style === "vertical" ? "py-10 md:py-16 xl:py-20" : "pb-10 md:pb-16 xl:pb-20"} ${className}`}
    >
      {children}
    </div>
  );
};

export default CommonSpace;
