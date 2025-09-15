import { ArrowDown, GeorgianFlag } from "./Icons";

const LanguageDropDown = () => {
  return (
    <div className="flex items-center py-[10px] pl-[10px] border border-[#EDEEF2] rounded-[40px]">
      <GeorgianFlag />
      <ArrowDown />
    </div>
  );
};

export default LanguageDropDown;
