import CommonButton from "./CommonButton";

const PhoneActionButton = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full ">
      <CommonButton size="xl" to="/quote">
        Build My Instant Quote
      </CommonButton>
      <CommonButton
        size="xl"
        href="tel:602-921-5749"
        showDefaultIcon
        variant="outline"
      >
        602-921-5749
      </CommonButton>
    </div>
  );
};

export default PhoneActionButton;
