"use client";

import React, { useState } from "react";
import { Camera } from "react-coolicons";
import StudentInfo from "./StudentInfo";
import ActivityTackSecond from "./ActivityTackSecond";
import ActivityTracker from "../dashboard/ActivityTracker";
import OurLessons from "../dashboard/OurLessons";
import PremiumStats from "../dashboard/PremiumStats";
import LastActivity from "./LastActivity";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  role: "STUDENT" | "TEACHER";
};

interface PersonalInfoProps {
  user: User;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ user }) => {
  const [fullName, setFullName] = useState(
    user.firstName + " " + user.lastName
  );
  return (
    <div className="lg:grid lg:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_3fr] lg:gap-4 relative">
      <div className="hidden lg:flex flex-col lg:order-1 order-2 sticky top-6 h-fit self-start">
        <div className="w-full">
          <OurLessons profilePage={true} />
        </div>
        <div className="w-full">
          <PremiumStats profilePage={true} />
        </div>
      </div>
      <div className="flex flex-col lg:order-2">
        <div className="bg-white p-4 rounded-2xl mt-8 lg:mt-6 ">
          <div className="sm:flex sm:justify-between">
            <div className="flex gap-2 items-center">
              <div className="w-[84px] h-[84px] bg-black rounded-full"></div>
              <div className="flex flex-col">
                <span className="font-helveticaneue-medium !font-bold text-base leading-6 text-[#080808]">
                  {fullName}
                </span>
                <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular mt-1">
                  მოსწავლე
                </span>
                <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular mt-4">
                  რეგისტრაციის თარიღი: 25 აგვისტო, 2025
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center mt-3 gap-[10px] bg-[#EBECF0] py-3 rounded-xl cursor-pointer sm:px-[20px] sm:h-[48px]">
              <Camera className="text-[#737373] " />
              <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular">
                ფოტოს შეცვლა
              </span>
            </div>
          </div>
          <hr className="text-[#F1F1F1] my-4" />
          <div className="scroll-wrapper">
            <div className="flex w-full overflow-x-auto custom-scroll gap-6 py-2">
              <span className="shrink-0 text-sm leading-5 text-[#080808] font-helveticaneue-medium cursor-pointer px-2 py-4">
                პირადი ინფორმაცია
              </span>
              <span className="shrink-0 text-sm leading-5 text-[#737373] font-helveticaneue-regular cursor-pointer hover:text-[#080808] transition-colors px-2 py-4">
                ბარათები
              </span>
              <span className="shrink-0 text-sm leading-5 text-[#737373] font-helveticaneue-regular cursor-pointer hover:text-[#080808] transition-colors px-2 py-4">
                გაკვეთილების ისტორია
              </span>
            </div>
            <hr className="text-[#F1F1F1]" />
          </div>
          <StudentInfo
            user={user}
            fullName={fullName}
            setFullName={setFullName}
          />
          <div className="sm:hidden">
            <ActivityTackSecond />
          </div>
          <div className="hidden sm:block mt-4">
            <ActivityTracker profilePage={true} />
          </div>
        </div>

        <LastActivity />

        <div className="md:grid md:grid-cols-2 md:gap-4 lg:hidden">
          <OurLessons profilePage={true} />
          <PremiumStats profilePage={true} />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
