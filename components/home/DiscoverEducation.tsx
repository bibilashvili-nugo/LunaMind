import React from "react";
import { discoveryEducationData } from "../../constants/data";

const DiscoverEducation = () => {
  return (
    <div className="pt-8 sm:pt-11 lg:pt-[52px] xl:pt-[64px] 3xl:pt-[84px]">
      <div className="flex flex-col gap-2 lg:flex-row pb-6 2xl:pb-8">
        <p className="font-lgvanastasia-regular text-[#0C0F21] leading-10 text-[40px] lg:w-1/2 lg:text-[52px] xl:text-[40px] 2xl:text-[64px] 2xl:leading-[52px]">
          აღმოაჩინე პერსონალიზებული განათლების ახალი შესაძლებლობა
        </p>
        <p className="lg:pl-2 xl:pl-[18px] xl:pr-[70px] 2xl:pr-0 2xl:pl-[173px] 3xl:pl-[61px] text-[#737373] text-sm leading-5 font-helveticaneue-regular lg:w-1/2 lg:self-end 2xl:text-base 2xl:leading-6">
          ჩვენ გვჯერა, რომ ტექნოლოგიებს შეუძლიათ სწავლის გამოცდილების შეცვლა
        </p>
      </div>
      <div className="flex flex-col gap-3 md:px-[22px] lg:px-0 lg:flex-row lg:gap-[16px] xl:gap-6">
        {discoveryEducationData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="inline-flex items-start flex-col gap-3 border border-[#EDEDED] p-4 rounded-3xl 2xl:gap-4"
            >
              <div
                className={`p-[10px] rounded-full inline-flex items-center justify-center`}
                style={{ backgroundColor: item?.backgroundColor }}
              >
                {typeof Icon !== "string" && <Icon color="white" />}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[#0C0F21] text-base leading-6 font-helveticaneue-medium">
                  {item?.title}
                </span>
                <p className="text-[#737373] text-sm leading-5">
                  {item?.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiscoverEducation;
