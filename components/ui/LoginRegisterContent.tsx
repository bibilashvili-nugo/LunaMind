import Link from "next/link";
import LanguageDropDown from "./LanguageDropDown";
import { useState } from "react";
import { Hide, Show } from "react-coolicons";

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

export const LoginRegisterContentInput = ({
  placeholder,
  value,
  onChange,
  type,
}: {
  placeholder: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full text-[#737373] p-4 border border-[#EBEBEB] rounded-[12px] focus:outline-none text-sm leading-5 font-helveticaneue-regular
        placeholder:font-helveticaneue-regular placeholder:text-[#737373] placeholder:text-sm placeholder:leading-5
        xl:text-base xl:leading-6"
      required
    />
  );
};

export const LoginRegisterContentInputPassword = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full text-[#737373] p-4 border border-[#EBEBEB] rounded-[12px] focus:outline-none text-sm leading-5 font-helveticaneue-regular
            placeholder:font-helveticaneue-regular placeholder:text-[#737373] placeholder:text-sm placeholder:leading-5
            xl:text-base xl:leading-6"
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#737373]"
      >
        {showPassword ? <Hide /> : <Show />}
      </button>
    </div>
  );
};

export const LoginRegisterContentTermsAndPrivacy = ({
  checked,
  onChange,
  text,
}: {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-[18px] h-[18px] rounded-[4px] border border-[#EBEBEB]"
      />
      <label className="text-sm leading-5 font-helveticaneue-regular text-[#737373] xl:text-base xl:leading-6">
        ვეთანხმები{" "}
        <span className="text-sm leading-5 font-helveticaneue-regular text-[#0077FF] xl:text-base xl:leading-6">
          {text}
        </span>
      </label>
    </div>
  );
};
