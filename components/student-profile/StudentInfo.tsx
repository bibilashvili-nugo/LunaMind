"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  role: "STUDENT" | "TEACHER";
};

// Props
interface StudentInfoProps {
  user: User;
  fullName: string;
  setFullName: (val: string) => void;
}

// Input component
const InputStudentInfo: React.FC<{
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="border border-[#F1F1F1] rounded-xl p-4 text-sm w-full focus:outline-none"
  />
);

const StudentInfo: React.FC<StudentInfoProps> = ({
  user,
  fullName,
  setFullName,
}) => {
  const [phone, setPhone] = useState(user.phoneNumber || "");
  const [email, setEmail] = useState(user.email || "");

  const timersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Backend update function wrapped in useCallback
  const updateBackend = useCallback(
    async (field: string, value: string) => {
      const data: Record<string, unknown> = {};

      // მხოლოდ firstName, lastName, email, phoneNumber დავტოვეთ
      if (["firstName", "lastName", "email", "phoneNumber"].includes(field)) {
        data[field] = value;
      }

      try {
        await fetch("/api/students/updateProfile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, data }),
        });
      } catch (err) {
        console.error("Failed to update profile:", err);
      }
    },
    [user.id]
  );

  // Debounced update wrapped in useCallback
  const debouncedUpdate = useCallback(
    (field: string, value: string, delay = 500) => {
      if (timersRef.current[field]) clearTimeout(timersRef.current[field]);
      timersRef.current[field] = setTimeout(
        () => updateBackend(field, value),
        delay
      );
    },
    [updateBackend]
  );

  // Watchers
  useEffect(() => {
    const [firstName, ...last] = fullName.split(" ");
    debouncedUpdate("firstName", firstName || "");
    debouncedUpdate("lastName", last.join(" ") || "");
  }, [fullName, debouncedUpdate]);

  useEffect(
    () => debouncedUpdate("phoneNumber", phone),
    [phone, debouncedUpdate]
  );
  useEffect(() => debouncedUpdate("email", email), [email, debouncedUpdate]);

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <InputStudentInfo
          value={fullName}
          onChange={setFullName}
          placeholder="სრული სახელი"
        />
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <InputStudentInfo
          value={phone}
          onChange={setPhone}
          placeholder="ტელეფონის ნომერი"
        />
        <InputStudentInfo
          value={email}
          onChange={setEmail}
          placeholder="ელ. ფოსტა"
        />
      </div>
    </div>
  );
};

export default StudentInfo;
