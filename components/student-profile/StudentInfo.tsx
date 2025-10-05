"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

// Types
type StudentProfile = {
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
  phoneNumber?: string;
  role: "STUDENT" | "TEACHER";
  StudentProfile?: StudentProfile;
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
  const profile = user.StudentProfile;

  const [age, setAge] = useState(profile?.age?.toString() || "");
  const [phone, setPhone] = useState(user.phoneNumber || "");
  const [email, setEmail] = useState(user.email || "");
  const [country, setCountry] = useState(profile?.country || "");
  const [city, setCity] = useState(profile?.city || "");
  const [address, setAddress] = useState(profile?.address || "");

  const timersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Backend update function wrapped in useCallback
  const updateBackend = useCallback(
    async (field: string, value: string) => {
      const data: Record<string, unknown> = {};

      if (["age", "country", "city", "address"].includes(field)) {
        data.StudentProfile = {
          [field]: field === "age" ? Number(value) : value,
        };
      } else if (
        ["firstName", "lastName", "email", "phoneNumber"].includes(field)
      ) {
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

  useEffect(() => debouncedUpdate("age", age), [age, debouncedUpdate]);
  useEffect(
    () => debouncedUpdate("phoneNumber", phone),
    [phone, debouncedUpdate]
  );
  useEffect(() => debouncedUpdate("email", email), [email, debouncedUpdate]);
  useEffect(
    () => debouncedUpdate("country", country),
    [country, debouncedUpdate]
  );
  useEffect(() => debouncedUpdate("city", city), [city, debouncedUpdate]);
  useEffect(
    () => debouncedUpdate("address", address),
    [address, debouncedUpdate]
  );

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <InputStudentInfo value={fullName} onChange={setFullName} />
        <InputStudentInfo value={age} onChange={setAge} />
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <InputStudentInfo value={phone} onChange={setPhone} />
        <InputStudentInfo value={email} onChange={setEmail} />
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:gap-4">
        <InputStudentInfo value={country} onChange={setCountry} />
        <InputStudentInfo value={city} onChange={setCity} />
        <InputStudentInfo value={address} onChange={setAddress} />
      </div>
    </div>
  );
};

export default StudentInfo;
