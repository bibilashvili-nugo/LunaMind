"use client";

import React, { useRef, useState, useEffect } from "react";
import { Camera } from "react-coolicons";
import ActivityTracker from "../dashboard/ActivityTracker";
import OurLessons from "../dashboard/OurLessons";
import PremiumStats from "../dashboard/PremiumStats";
import Image from "next/image";
import Card from "../student-profile/Card";
import LessonsHistory from "../student-profile/LessonsHistory";
import ActivityTackSecond from "../student-profile/ActivityTackSecond";
import LastActivity from "../student-profile/LastActivity";
import TeacherInfo from "./TeacherInfo";

type TeacherProfile = {
  age?: number;
  country?: string;
  city?: string;
  address?: string;
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  role: "STUDENT" | "TEACHER";
  image?: string;
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
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch teacher profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/teachers/profile?userId=${user.id}`);
        const data = await res.json();
        setTeacherProfile(data.profile);
      } catch (err) {
        console.error("Failed to fetch teacher profile:", err);
      }
    };
    fetchProfile();
  }, [user.id]);

  // Handle profile image upload
  // inside PersonalInfo component
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
      if (data.imageUrl) setProfileImage(data.imageUrl); // Update UI
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="lg:grid lg:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_3fr] lg:gap-4 relative">
      <div className="hidden lg:flex flex-col lg:order-1 order-2 sticky top-6 h-fit self-start">
        <OurLessons profilePage={true} teacher={true} />
        <PremiumStats profilePage={true} />
      </div>

      <div className="flex flex-col lg:order-2">
        <div className="bg-white p-4 rounded-2xl mt-8 lg:mt-6">
          {/* Header */}
          <div className="sm:flex sm:justify-between sm:items-center">
            <div className="flex gap-2 items-center">
              <div className="w-[84px] h-[84px] rounded-full xl:w-[124px] xl:h-[124px] relative overflow-hidden">
                <Image
                  src={
                    profileImage || user.image || "/images/default-profile.png"
                  }
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
                  რეპეტიტორი
                </span>
                <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular mt-4">
                  რეგისტრაციის თარიღი: 25 აგვისტო, 2025
                </span>
              </div>
            </div>

            {/* Camera */}
            <div
              className="flex items-center justify-center mt-3 gap-[10px] bg-[#EBECF0] py-3 rounded-xl cursor-pointer sm:px-[20px] sm:h-[48px]"
              onClick={handleCameraClick}
            >
              <Camera className="text-[#737373]" />
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

          {/* Tabs */}
          <div className="scroll-wrapper">
            <div className="flex w-full overflow-x-auto custom-scroll gap-6 py-2">
              {["personal", "cards", "lessons"].map((tab) => (
                <span
                  key={tab}
                  onClick={() => setActiveTab(tab as Tab)}
                  className={`shrink-0 text-sm leading-5 cursor-pointer px-2 py-4 ${
                    activeTab === tab
                      ? "text-[#080808] font-helveticaneue-medium"
                      : "text-[#737373] font-helveticaneue-regular hover:text-[#080808] transition-colors"
                  }`}
                >
                  {tab === "personal"
                    ? "პირადი ინფორმაცია"
                    : tab === "cards"
                    ? "ბარათები"
                    : "გაკვეთილების ისტორია"}
                </span>
              ))}
            </div>
            <hr className="text-[#F1F1F1]" />
          </div>

          {/* Content */}
          {activeTab === "personal" && teacherProfile && (
            <TeacherInfo
              user={{ ...user, TeacherProfile: teacherProfile }}
              fullName={fullName}
              setFullName={setFullName}
            />
          )}
          {activeTab === "cards" && <Card />}
          {activeTab === "lessons" && <LessonsHistory />}

          {activeTab === "personal" && (
            <>
              <div className="sm:hidden">
                <ActivityTackSecond />
              </div>
              <div className="hidden sm:block mt-4">
                <ActivityTracker profilePage={true} teacher={true} />
              </div>
            </>
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
