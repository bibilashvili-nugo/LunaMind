import { PackageText } from "./Text";

const Packages = ({
  forWho,
  color,
  buttonText,
  containerWidth,
}: {
  forWho: string;
  color: string;
  buttonText: string;
  containerWidth?: string;
}) => {
  return (
    <div
      className={`${color} rounded-3xl w-full p-5 flex flex-col gap-6 sm:p-6 lg:p-8 sm:gap-8 md:gap-[44px] xl:gap-[64px] ${containerWidth}`}
    >
      <div className="flex flex-col gap-3">
        <span className="text-[#0C0F21] text-[32px] leading-[100%] font-lgvanastasia-regular lg:text-[44px]">
          {forWho}
        </span>
        <p className="text-[#737373] text-sm leading-5 font-helveticaneue-regular">
          მცირე ტექსტი
        </p>
      </div>
      <div className="flex flex-col gap-5 lg:pt-[20px]">
        <PackageText desc="შეთავაზების ტექსტი" />
        <PackageText
          desc="შეთავაზების ტექსტი შეიძლება იყოს
                უფრო დიდი ვიდრე წინა"
        />
        <PackageText desc="შეთავაზების ტექსტი ასევე ესეც შეიძლება იყოს უფრო დიდი" />
      </div>
      <button className="text-sm leading-5 font-helveticaneue-medium py-4 px-8 rounded-[26px] bg-[#0C0F21] text-white cursor-pointer self-start">
        {buttonText}
      </button>
    </div>
  );
};

export default Packages;
