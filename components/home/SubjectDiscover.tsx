import React from "react";
import { SectionHeader } from "../ui/Text";
import { WavyCheck } from "react-coolicons";

const subjectsInfo = [
  {
    name: "მათემატიკა",
    status: "20+ ვერიფიცირებული რეპეტიტორი",
    color: "#FFD52A",
  },
  {
    name: "ქართული",
    status: "20+ ვერიფიცირებული რეპეტიტორი",
    color: "#8FF2B3",
  },
  {
    name: "ისტორია",
    status: "რეპეტიტორები მალე დაემატება",
    color: "#F15A24",
  },
  {
    name: "გეოგრაფია",
    status: "რეპეტიტორები მალე დაემატება",
    color: "#FF7FFE",
  },
  {
    name: "ქიმია",
    status: "20+ ვერიფიცირებული რეპეტიტორი",
    color: "#FFEFCE",
  },
  {
    name: "ფიზიკა",
    status: "20+ ვერიფიცირებული რეპეტიტორი",
    color: "#94EB60",
  },
  {
    name: "ბიოლოგია",
    status: "რეპეტიტორები მალე დაემატება",
    color: "#6947FF",
  },
  {
    name: "ხელოვნება",
    status: "რეპეტიტორები მალე დაემატება",
    color: "#C69C6B",
  },
  {
    name: "ინგლისური",
    status: "20+ ვერიფიცირებული რეპეტიტორი",
    color: "#9859C7",
  },
  {
    name: "რუსული",
    status: "რეპეტიტორები მალე დაემატება",
    color: "#6FC3E2",
  },
  {
    name: "გერმანული",
    status: "რეპეტიტორები მალე დაემატება",
    color: "#F6A69A",
  },
  {
    name: "ესპანური",
    status: "რეპეტიტორები მალე დაემატება",
    color: "#63D49C",
  },
  {
    name: "ფრანგული",
    status: "რეპეტიტორები მალე დაემატება",
    color: "#60A5FA",
  },
  {
    name: "დაწყებითი კლასები",
    status: "20+ ვერიფიცირებული რეპეტიტორი",
    color: "#22C55E",
  },
];

const SubjectDiscover = () => {
  return (
    <div className="pt-8 sm:pt-[57px] md:pt-[135px] lg:pt-[76px] xl:pt-[80px] 2xl:pt-[64px] 3xl:pt-[84px]">
      <SectionHeader
        title="აღმოაჩინეთ სასურველი რეპეტიტორი 
თქვენთვის სასურველ საგანში"
        description=""
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {subjectsInfo?.map((item, index) => (
          <div
            key={index}
            className="rounded-3xl flex flex-col items-center gap-6 p-6"
            style={{ backgroundColor: item?.color }}
          >
            <div className="rounded-full bg-white p-[14px]">
              <WavyCheck width={24} height={24} color="black" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-base leading-6 uppercase font-helveticaneue-medium !font-bold text-[#0C0F21]">
                {item?.name}
              </h3>
              <span className="text-[#0C0F21] text-sm leading-5 font-helveticaneue-regular">
                {item?.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectDiscover;
