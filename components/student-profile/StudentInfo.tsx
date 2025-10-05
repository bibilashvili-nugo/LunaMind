"use client";
import React, { useState } from "react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  age?: number;
  role: "STUDENT" | "TEACHER";
};

interface StudentProfile {
  age?: number;
  country?: string;
  city?: string;
  address?: string;
}

interface StudentInfoProps {
  user: User;
  profile?: StudentProfile;
}

const InputStudentInfo: React.FC<{
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="border border-[#F1F1F1] rounded-xl p-4 text-sm leading-5 text-black font-helveticaneue-regular focus:ring-0 focus:outline-0 w-full"
    />
  );
};

const StudentInfo: React.FC<StudentInfoProps> = ({ user, profile }) => {
  const [fullName, setFullName] = useState(
    user.firstName + " " + user.lastName
  );
  const [age, setAge] = useState(profile?.age?.toString() || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [email, setEmail] = useState(user.email || "");
  const [country, setCountry] = useState(profile?.country || "");
  const [city, setCity] = useState(profile?.city || "");
  const [address, setAddress] = useState(profile?.address || "");

  return (
    <div className="mt-4">
      <InputStudentInfo value={fullName} onChange={setFullName} />
      <InputStudentInfo
        value={age}
        onChange={setAge}
        placeholder="შეიყვანეთ ასაკი"
      />
      <InputStudentInfo
        value={phone}
        onChange={setPhone}
        placeholder="შეიყვანეთ ტელეფონის ნომერი"
      />
      <InputStudentInfo
        value={email}
        onChange={setEmail}
        placeholder="შეიყვანეთ ელ. ფოსტა"
      />
      <InputStudentInfo
        value={country}
        onChange={setCountry}
        placeholder="შეიყვანეთ ქვეყანა"
      />
      <InputStudentInfo
        value={city}
        onChange={setCity}
        placeholder="შეიყვანეთ ქალაქი"
      />
      <InputStudentInfo
        value={address}
        onChange={setAddress}
        placeholder="შეიყვანეთ მისამართი"
      />
    </div>
  );
};

export default StudentInfo;
