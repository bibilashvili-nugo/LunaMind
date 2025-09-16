import Link from "next/link";
import LanguageDropDown from "./LanguageDropDown";

export const LoginRegisterContentHeader = () => {
  return (
    <div className="flex items-center justify-between 3xl:pr-[192px]">
      <span className="text-2xl text-[#0C0F21] font-aclonica-regular">
        LunaMind
      </span>
      <div className="lg:mr-4 2xl:mr-0">
        <LanguageDropDown />
      </div>
    </div>
  );
};

export const LoginRegisterContentTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center mt-8 lg:mt-[44px] lg:items-start 3xl:!mt-[64px]">
      <span className="text-[44px] text-[#0C0F21] font-lgvanastasia-regular leading-[100%]">
        {title}
      </span>
      <span className="text-sm text-[#737373] font-helveticaneue-regular leading-5 xl:text-base">
        შეიყვანეთ თქვენი მონაცემები
      </span>
    </div>
  );
};

export const LoginRegisterContentSocial = ({
  authType,
}: {
  authType: string;
}) => {
  return (
    <>
      <div className="flex flex-col mt-8 gap-4 lg:mt-6 xl:mt-[44px] 3xl:!mt-[64px]">
        <button className="flex items-center gap-2 border border-[#EBEBEB] rounded-[12px] w-full justify-center py-3 hover:bg-gray-100 transition">
          <div className="w-6 h-6 bg-[#D9D9D9] rounded-full"></div>
          <span className="text-sm text-[#737373] font-helveticaneue-regular leading-5 xl:text-base xl:leading-6">
            Google
          </span>
        </button>
        <button className="flex items-center gap-2 border border-[#EBEBEB] rounded-[12px] w-full justify-center py-3 hover:bg-gray-100 transition">
          <div className="w-6 h-6 bg-[#D9D9D9] rounded-full"></div>
          <span className="text-sm text-[#737373] font-helveticaneue-regular leading-5 xl:text-base xl:leading-6">
            Facebook
          </span>
        </button>
      </div>
      <div className="text-center text-xs text-[#0C0F21] font-helveticaneue-regular leading-4 mt-6 xl:text-sm xl:leading-5">
        გაქვს ანგარიში?
        <Link
          href={`${authType === "რეგისტრაცია" ? "/register" : "/login"}`}
          className="text-[#0077FF] hover:underline leading-4 text-xs xl:text-sm xl:leading-5"
        >
          {authType}
        </Link>
      </div>
    </>
  );
};
