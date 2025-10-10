"use client";

import React, { useRef, useState } from "react";
import { Camera } from "react-coolicons";
import StudentInfo from "./StudentInfo";
import ActivityTackSecond from "./ActivityTackSecond";
import ActivityTracker from "../dashboard/ActivityTracker";
import OurLessons from "../dashboard/OurLessons";
import PremiumStats from "../dashboard/PremiumStats";
import LastActivity from "./LastActivity";
import Card from "./Card";
import LessonsHistory from "./LessonsHistory";
import Image from "next/image";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  role: "STUDENT" | "TEACHER";
  image?: string | undefined;
};

interface PersonalInfoProps {
  user: User;
}

type Tab = "personal" | "cards" | "lessons";

const PersonalInfo: React.FC<PersonalInfoProps> = ({ user }) => {
  const [fullName, setFullName] = useState(
    user.firstName + " " + user.lastName
  );
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const [profileImage, setProfileImage] = useState<string | null>(null); // ახალი სურათი
  const fileInputRef = useRef<HTMLInputElement>(null); // hidden file input

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user.id);

    try {
      const res = await fetch("/api/students/uploadProfileImage", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.imageUrl) {
        setProfileImage(data.imageUrl); // ახალი სურათი განახლდა
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  // Camera div click
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

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
          <div className="sm:flex sm:justify-between sm:items-center">
            <div className="flex gap-2 items-center">
              <div className="w-[84px] h-[84px] rounded-full xl:w-[124px] xl:h-[124px] relative overflow-hidden">
                <Image
                  src={profileImage || user.image || "/default-profile.png"}
                  alt="user"
                  fill
                  className="object-cover"
                />
              </div>
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
            <div
              className="flex items-center justify-center mt-3 gap-[10px] bg-[#EBECF0] py-3 rounded-xl cursor-pointer sm:px-[20px] sm:h-[48px]"
              onClick={handleCameraClick}
            >
              <Camera className="text-[#737373] " />
              <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular">
                ფოტოს შეცვლა
              </span>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <hr className="text-[#F1F1F1] my-4" />
          <div className="scroll-wrapper">
            <div className="flex w-full overflow-x-auto custom-scroll gap-6 py-2">
              <span
                onClick={() => setActiveTab("personal")}
                className={`shrink-0 text-sm leading-5 cursor-pointer px-2 py-4 ${
                  activeTab === "personal"
                    ? "text-[#080808] font-helveticaneue-medium"
                    : "text-[#737373] font-helveticaneue-regular hover:text-[#080808] transition-colors"
                }`}
              >
                პირადი ინფორმაცია
              </span>

              <span
                onClick={() => setActiveTab("cards")}
                className={`shrink-0 text-sm leading-5 cursor-pointer px-2 py-4 ${
                  activeTab === "cards"
                    ? "text-[#080808] font-helveticaneue-medium"
                    : "text-[#737373] font-helveticaneue-regular hover:text-[#080808] transition-colors"
                }`}
              >
                ბარათები
              </span>

              <span
                onClick={() => setActiveTab("lessons")}
                className={`shrink-0 text-sm leading-5 cursor-pointer px-2 py-4 ${
                  activeTab === "lessons"
                    ? "text-[#080808] font-helveticaneue-medium"
                    : "text-[#737373] font-helveticaneue-regular hover:text-[#080808] transition-colors"
                }`}
              >
                გაკვეთილების ისტორია
              </span>
            </div>
            <hr className="text-[#F1F1F1]" />
          </div>
          {activeTab === "personal" && (
            <StudentInfo
              user={user}
              fullName={fullName}
              setFullName={setFullName}
            />
          )}
          {activeTab === "cards" && <Card />}
          {activeTab === "lessons" && <LessonsHistory />}
          {activeTab === "personal" && (
            <div className="sm:hidden">
              <ActivityTackSecond />
            </div>
          )}
          {activeTab === "personal" && (
            <div className="hidden sm:block mt-4">
              <ActivityTracker profilePage={true} />
            </div>
          )}
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
