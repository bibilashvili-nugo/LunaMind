"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CloseCircle, TrashFull } from "react-coolicons";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminNavbar from "../../../../../../components/admin/AdminNavbar";
import { useStudents } from "@/hooks/useStudents";

type Student = {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  image?: string | null;
  isActive: boolean;
  banned: boolean;
  banReason?: string | null;
  StudentProfile?: {
    educationLevel?: string;
    desiredSubjects?: string[];
    reason?: string;
    hasOtherCourses?: boolean;
    usageFrequency?: string;
    preferredLessonType?: string;
    discoverySource?: string;
    currentStep?: number;
    completed?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
  bookedLessonsAsStudent?: [];
  studentReviews?: [];
};

const AdminStudents: React.FC = () => {
  const { user, isLoading } = useAdminAuth();
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading: loadingStudents } = useStudents();

  const toggleExpand = (studentId: string) => {
    setExpandedStudent(expandedStudent === studentId ? null : studentId);
  };

  const students: Student[] = data?.students || [];

  const filteredStudents = students.filter((s) => {
    const fullName = `${s.firstName || ""} ${s.lastName || ""}`.toLowerCase();
    const email = s.email.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    return fullName.includes(searchLower) || email.includes(searchLower);
  });

  if (isLoading || loadingStudents) {
    return (
      <div className="h-screen bg-[#081028] flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#081028] grid grid-cols-5 px-4 py-4 gap-4">
      <AdminNavbar user={user} />

      <div className="bg-gradient-to-br from-[#0A1330] to-[#151F45] col-span-4 rounded-2xl shadow-2xl border border-[#1A2450] p-8 flex flex-col h-[calc(100vh-2rem)]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">
            Students Management ({filteredStudents.length})
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

        <div className="flex-1 overflow-hidden">
          {filteredStudents.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <p className="text-xl mb-2">No students found</p>
              <p className="text-sm">
                {searchTerm
                  ? `No results for "${searchTerm}"`
                  : "No students available"}
              </p>
            </div>
          ) : (
            <ul className="h-full overflow-y-auto pr-2 custom-scrollbar space-y-4">
              {filteredStudents.map((student) => (
                <li
                  key={student.id}
                  className="text-white border border-[#2A3650] rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div
                    className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#1A2450] transition-colors"
                    onClick={() => toggleExpand(student.id)}
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={student.image || "/images/default-profile.png"}
                        alt={student.firstName || "სურათი"}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between h-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {student.firstName} {student.lastName}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {student.email}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {student.phoneNumber}
                          </p>
                        </div>

                        <div className="flex flex-col justify-between items-end h-full">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              student.isActive
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            }`}
                          >
                            {student.isActive ? "Active" : "Inactive"}
                          </span>
                          <span className="text-gray-400 mt-2">
                            {expandedStudent === student.id ? "▲" : "▼"}
                          </span>
                        </div>
                      </div>

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

                  {expandedStudent === student.id && (
                    <div className="p-4 bg-[#0A1330] border-t border-[#2A3650]">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {student.StudentProfile && (
                          <>
                            <p>
                              <span className="font-semibold">
                                Education Level:
                              </span>{" "}
                              {student.StudentProfile.educationLevel}
                            </p>
                            <p>
                              <span className="font-semibold">Subjects:</span>{" "}
                              {student.StudentProfile.desiredSubjects?.join(
                                ", "
                              )}
                            </p>
                            <p>
                              <span className="font-semibold">Reason:</span>{" "}
                              {student.StudentProfile.reason}
                            </p>
                            <p>
                              <span className="font-semibold">
                                Usage Frequency:
                              </span>{" "}
                              {student.StudentProfile.usageFrequency}
                            </p>
                            <p>
                              <span className="font-semibold">
                                Preferred Lesson Type:
                              </span>{" "}
                              {student.StudentProfile.preferredLessonType}
                            </p>
                            <p>
                              <span className="font-semibold">
                                Discovery Source:
                              </span>{" "}
                              {student.StudentProfile.discoverySource}
                            </p>
                          </>
                        )}
                        <p>
                          <span className="font-semibold">Created:</span>{" "}
                          {student.StudentProfile?.createdAt
                            ? new Date(
                                student.StudentProfile.createdAt
                              ).toLocaleDateString()
                            : "-"}
                        </p>
                        <p>
                          <span className="font-semibold">Status:</span>{" "}
                          {student.isActive ? "Active" : "Inactive"}{" "}
                          {student.banned && `(Banned: ${student.banReason})`}
                        </p>
                        <p>
                          <span className="font-semibold">Booked Lessons:</span>{" "}
                          {student.bookedLessonsAsStudent?.length || 0}
                        </p>
                        <p>
                          <span className="font-semibold">Reviews:</span>{" "}
                          {student.studentReviews?.length || 0}
                        </p>
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

export default AdminStudents;
