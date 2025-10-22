"use client";

import React, { useEffect, useState } from "react";
import SpinContent from "../../../../components/ui/SpinContent";
import {
  LoginRegisterContentHeader,
  LoginRegisterContentInput,
  LoginRegisterContentInputPassword,
  LoginRegisterContentSocial,
  LoginRegisterContentTermsAndPrivacy,
  LoginRegisterContentTitle,
} from "../../../../components/ui/LoginRegisterContent";
import { useRouter } from "next/navigation";
import { emailRegex, isValidPassword, isValidPhone } from "@/utils/validation";

type Role = "STUDENT" | "TEACHER";

const RegistrationForm = () => {
  const [role, setRole] = useState<Role>("STUDENT");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get("role");
    if (roleParam === "TEACHER") setRole("TEACHER");
  }, []);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const georgianNameRegex = /^[ა-ჰ\s]*$/; // * რათა ტაიპისას არ დაბლოკოს
    if (georgianNameRegex.test(value)) {
      setFullName(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parts = fullName.trim().split(" ");
    if (parts.length < 2 || parts.some((part) => part.length < 2)) {
      setError("გთხოვთ შეიყვანოთ სახელი და გვარი (თითოეულში მინიმუმ 2 ასო).");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("ელ.ფოსტა არასწორია.");
      return;
    }
    if (!isValidPhone(phone)) {
      setError("ტელეფონი არასწორია, გამოიყენეთ მხოლოდ ციფრები (9-15 სიმბოლო).");
      return;
    }
    if (!isValidPassword(password)) {
      setError(
        "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს, ერთ დიდ ასოს და ერთ ციფრს."
      );
      return;
    }

    if (!acceptedTerms || !acceptedPrivacy) {
      setError("გთხოვთ მონიშნეთ წესები და კონფიდენციალურობა.");
      return;
    }

    if (password !== confirmPassword) {
      setError("პაროლები არ ემთხვევა.");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        role,
        email,
        phoneNumber: phone,
        password,
        acceptedTerms,
        acceptedPrivacy,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    setError("");
    router.push("/login");
  };

  return (
    <div className="h-screen flex px-4 sm:px-6 lg:px-[44px] w-full gap-6 2xl:px-[152px] 2xl:gap-[44px]">
      <div className="pt-8 flex flex-col mx-auto w-full lg:w-[65%] xl:w-1/2 h-screen overflow-y-auto hide-scrollbar">
        {/* Header */}
        <LoginRegisterContentHeader />
        {/* Title */}
        <LoginRegisterContentTitle title="რეგისტრაცია" />
        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col mt-6">
          <div className="flex w-full items-center border border-[#EBEBEB] rounded-[62px] p-1">
            <div
              onClick={() => setRole("STUDENT")}
              className={`w-1/2 text-center text-sm leading-5 cursor-pointer 
                ${
                  role === "STUDENT"
                    ? "font-helveticaneue-medium text-[#0C0F21] bg-[#F6F7FB] rounded-[48px] py-3"
                    : "font-helveticaneue-regular text-[#737373] py-3"
                }`}
            >
              მოსწავლე
            </div>

            <div
              onClick={() => setRole("TEACHER")}
              className={`w-1/2 text-center text-sm leading-5 cursor-pointer 
                ${
                  role === "TEACHER"
                    ? "font-helveticaneue-medium text-[#0C0F21] bg-[#F6F7FB] rounded-[48px] py-3"
                    : "font-helveticaneue-regular text-[#737373] py-3"
                }`}
            >
              მასწავლებელი
            </div>
          </div>
          <div className="mt-[20px] lg:mt-[24px] flex flex-col gap-4">
            <LoginRegisterContentInput
              placeholder="სახელი და გვარი (ქართულად)"
              value={fullName}
              onChange={handleFullNameChange}
              type="text"
            />
            <LoginRegisterContentInput
              placeholder="ელ.ფოსტა"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <LoginRegisterContentInput
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="ტელეფონის ნომერი"
            />
            <LoginRegisterContentInputPassword
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="პაროლი"
            />
            <LoginRegisterContentInputPassword
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="გაიმეორეთ პაროლი"
            />
          </div>
          <div className="mt-3 flex flex-col gap-[16px]">
            <LoginRegisterContentTermsAndPrivacy
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              text="წესებს და პირობებს"
            />
            <LoginRegisterContentTermsAndPrivacy
              checked={acceptedPrivacy}
              onChange={(e) => setAcceptedPrivacy(e.target.checked)}
              text="კონფიდენციალურობის პოლიტიკას"
            />
          </div>
          <button
            type="submit"
            className="bg-[#FFD52A] py-4 w-full rounded-[40px] text-sm leading-5 text-[#0C0F21] font-helveticaneue-medium
            mt-6 xl:text-base xl:leading-6 cursor-pointer"
          >
            რეგისტრაცია
          </button>
        </form>
        {/* Social login buttons */}
        <LoginRegisterContentSocial authType="ავტორიზაცია" />
      </div>
      <hr className="hidden lg:block w-px h-full bg-[#E5E5E5]" />
      <SpinContent />
    </div>
  );
};

export default RegistrationForm;
