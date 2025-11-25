"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminNavbar from "../../../../../../components/admin/AdminNavbar";
import { useTeachers } from "@/hooks/useTeachers";
import Image from "next/image";
import { CloseCircle, TrashFull } from "react-coolicons";

interface User {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

type Teacher = {
  id: string;
  userId: string;
  age: number | null;
  city: string | null;
  profession: string | null;
  education: string | null;
  currentStep: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  goal: string | null;
  experienceYears: string | null;
  preferredAgeGroups: string[];
  hasCertificate: boolean | null;
  certificateDescription: string | null;
  certificateFiles: string[];
  offersFreeIntroLesson: boolean | null;
  hasIntroVideo: boolean | null;
  introVideoUrl: string | null;
  howDidYouHearAboutUs: string | null;
  user: {
    id: string;
    role: string;
    firstName?: string;
    lastName?: string;
    email: string;
    emailVerified: string | null;
    phoneNumber: string;
    image?: string | null;
    acceptedTerms: boolean;
    acceptedPrivacy: boolean;
    isActive: boolean;
    banned: boolean;
    banReason: string | null;
  };
  teacherSubjects: {
    id: string;
    teacherId: string;
    name: string;
    price: number;
  }[];
  lessons: [];
};

const AdminTeacher: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedTeacher, setExpandedTeacher] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const { data } = useTeachers();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check-admin", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          router.push("/admin");
          return;
        }

        const data = await res.json();
        setUser(data.user);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        router.push("/admin");
      }
    };

    checkAuth();
  }, [router]);

  const toggleExpand = (teacherId: string) => {
    setExpandedTeacher(expandedTeacher === teacherId ? null : teacherId);
  };

  const filteredTeachers = data?.teachers?.filter((teacher: Teacher) => {
    const fullName = `${teacher.user.firstName || ""} ${
      teacher.user.lastName || ""
    }`.toLowerCase();
    const email = teacher.user.email.toLowerCase();
    const searchLower = searchTerm.toLowerCase();

    return fullName.includes(searchLower) || email.includes(searchLower);
  });

  if (isLoading) {
    return (
      <div className="h-screen bg-[#081028] flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#081028] grid grid-cols-5 px-4 py-4 gap-4">
      {/* Sidebar */}
      <AdminNavbar user={user} />

      {/* Main Content */}
      <div className="bg-gradient-to-br from-[#0A1330] to-[#151F45] col-span-4 rounded-2xl shadow-2xl border border-[#1A2450] p-8 flex flex-col h-[calc(100vh-2rem)]">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            Teachers Management ({filteredTeachers?.length || 0})
          </h2>

          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-[#0A1330] border border-[#2A3650] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Teacher List */}
        <div className="flex-1 overflow-hidden">
          {filteredTeachers?.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <p className="text-xl mb-2">No teachers found</p>
              <p className="text-sm">
                {searchTerm
                  ? `No results for "${searchTerm}"`
                  : "No teachers available"}
              </p>
            </div>
          ) : (
            <ul className="h-full overflow-y-auto pr-2 custom-scrollbar space-y-4">
              {filteredTeachers?.map((item: Teacher) => (
                <li
                  key={item.id}
                  className="text-white border border-[#2A3650] rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Header */}
                  <div
                    className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#1A2450] transition-colors"
                    onClick={() => toggleExpand(item.id)}
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={item.user.image || "/images/default-profile.png"}
                        alt={item.user.firstName || "სურათი"}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between h-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {item.user.firstName} {item.user.lastName}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {item.user.email}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {item.user.phoneNumber}
                          </p>
                        </div>

                        <div className="flex flex-col justify-between items-end h-full">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              item.completed ? "bg-green-500" : "bg-yellow-500"
                            }`}
                          >
                            {item.completed
                              ? "Completed"
                              : `Step ${item.currentStep}`}
                          </span>
                          <span className="text-gray-400 mt-2">
                            {expandedTeacher === item.id ? "▲" : "▼"}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-3 justify-end">
                        <button className="p-1 rounded hover:bg-red-600 transition-colors">
                          <TrashFull className="text-white" />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-600 transition-colors">
                          <CloseCircle className="text-white" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  {expandedTeacher === item.id && (
                    <div className="p-4 bg-[#0A1330] border-t border-[#2A3650]">
                      <div className="grid grid-cols-2 gap-4">
                        {/* Basic Info */}
                        <div>
                          <h3 className="font-bold text-lg mb-2">
                            საბაზისო ინფორმაცია
                          </h3>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="font-semibold">ასაკი:</span>{" "}
                              {item.age || "Not specified"}
                            </p>
                            <p>
                              <span className="font-semibold">ქალაქი:</span>{" "}
                              {item.city || "Not specified"}
                            </p>
                            <p>
                              <span className="font-semibold">განათლება:</span>{" "}
                              {item.education || "Not specified"}
                            </p>
                            <p>
                              <span className="font-semibold">
                                გამოცდილება:
                              </span>{" "}
                              {item.experienceYears || "Not specified"}
                            </p>
                            <p>
                              <span className="font-semibold">მიზანი:</span>{" "}
                              {item.goal || "Not specified"}
                            </p>
                          </div>
                        </div>

                        {/* Professional Info */}
                        <div>
                          <h3 className="font-bold text-lg mb-2">
                            პროფესიული ინფორმაცია
                          </h3>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="font-semibold">შესახებ:</span>{" "}
                              {item.profession || "Not specified"}
                            </p>
                            <p>
                              <span className="font-semibold">
                                სასურველი ასაკობრივი ჯგუფი:
                              </span>{" "}
                              {item.preferredAgeGroups?.join(", ") || "None"}
                            </p>
                            <p>
                              <span className="font-semibold">
                                უფასო გაცნობითი ვიდეო:
                              </span>{" "}
                              {item.offersFreeIntroLesson ? "კი" : "არა"}
                            </p>
                            <p>
                              <span className="font-semibold">
                                სერთიფიკატი:
                              </span>{" "}
                              {item.hasCertificate ? "კი" : "არა"}
                            </p>
                          </div>
                        </div>

                        {/* Subjects */}
                        {item.teacherSubjects.length > 0 && (
                          <div className="col-span-2">
                            <h3 className="font-bold text-lg mb-2">საგნები</h3>
                            <div className="flex flex-wrap gap-2">
                              {item.teacherSubjects.map((subject) => (
                                <span
                                  key={subject.id}
                                  className="bg-[#1A2450] px-3 py-1 rounded-full text-sm"
                                >
                                  {subject.name} - ₾{subject.price}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Certificate Files */}
                        {item.certificateFiles.length > 0 && (
                          <div className="col-span-2">
                            <h3 className="font-bold text-lg mb-2">
                              სერთიფიკატის ფაილი
                            </h3>
                            <div className="space-y-1">
                              {item.certificateFiles.map((file, index) => (
                                <a
                                  key={index}
                                  href={file}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 block truncate"
                                >
                                  სერთიფიკატი {index + 1}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Additional Info */}
                        <div className="col-span-2">
                          <h3 className="font-bold text-lg mb-2">
                            დამატებითი ინფორმაცია
                          </h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <p>
                              <span className="font-semibold">
                                საიდან გაიგე ჩვენზე:
                              </span>{" "}
                              {item.howDidYouHearAboutUs || "Not specified"}
                            </p>
                            <p>
                              <span className="font-semibold">Created:</span>{" "}
                              {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                            <p>
                              <span className="font-semibold">სტატუსი:</span>{" "}
                              {item.user.isActive ? "Active" : "Inactive"}{" "}
                              {item.user.banned && "(Banned)"}
                            </p>
                            <p>
                              <span className="font-semibold">
                                Email ვერიფიცირებული:
                              </span>{" "}
                              {item.user.emailVerified ? "კი" : "არა"}
                            </p>
                          </div>
                        </div>

                        {/* Certificate Description */}
                        {item.certificateDescription && (
                          <div className="col-span-2">
                            <h3 className="font-bold text-lg mb-2">
                              სერთიფიკატის დასახელება
                            </h3>
                            <p className="text-sm bg-[#1A2450] p-3 rounded">
                              {item.certificateDescription}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTeacher;
