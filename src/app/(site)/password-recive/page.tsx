"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import {
  LoginRegisterContentHeader,
  LoginRegisterContentInput,
  LoginRegisterContentTitle,
} from "../../../../components/ui/LoginRegisterContent";
import SpinContent from "../../../../components/ui/SpinContent";

interface CheckEmailResponse {
  exists: boolean;
  message?: string;
}

interface RequestOtpResponse {
  message: string;
}

interface ResetPasswordResponse {
  message: string;
}

const PasswordRecieve: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);

  // ✅ Check if email exists
  useEffect(() => {
    if (!email) {
      setIsValidEmail(false);
      return;
    }

    const controller = new AbortController();

    const checkEmail = async () => {
      try {
        const res = await fetch("/api/auth/check-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Failed to check email");

        const data: CheckEmailResponse = await res.json();
        setIsValidEmail(Boolean(data.exists));
      } catch {
        setIsValidEmail(false);
      }
    };

    const timer = setTimeout(checkEmail, 500);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [email]);

  // ✅ Countdown timer for OTP resend
  useEffect(() => {
    if (countdown <= 0) return;
    const interval = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  const handleRequestOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data: RequestOtpResponse = await res.json();

      if (!res.ok) throw new Error(data.message);

      setOtpSent(true);
      setCountdown(60);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data: ResetPasswordResponse = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Password reset successfully!");

      // Reset all fields
      setOtpSent(false);
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setEmail("");
      setIsValidEmail(false);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <div className="h-screen flex px-4 sm:px-6 lg:px-[44px] w-full gap-6 2xl:px-[152px] 2xl:gap-[44px]">
      <div className="pt-8 flex flex-col mx-auto w-full lg:w-[65%] xl:w-1/2 h-screen overflow-y-auto hide-scrollbar">
        <LoginRegisterContentHeader />
        <LoginRegisterContentTitle title="პაროლის აღდგენა" />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        {!otpSent ? (
          <>
            <LoginRegisterContentInput
              placeholder="ელ.ფოსტა"
              type="email"
              value={email}
              onChange={handleChange(setEmail)}
            />
            <button
              disabled={!isValidEmail || loading || countdown > 0}
              onClick={handleRequestOtp}
              className={`py-4 w-full rounded-[40px] text-sm font-helveticaneue-medium mt-6 ${
                isValidEmail && countdown === 0
                  ? "bg-[#FFD52A] text-[#0C0F21] cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading
                ? "გაგზავნა..."
                : countdown > 0
                ? `გთხოვთ, დაელოდოთ ${countdown}s`
                : "კოდის მიღება"}
            </button>
            {!isValidEmail && email && (
              <p className="text-red-500 text-sm mt-1">
                მომხმარებელი არ არსებობს
              </p>
            )}
          </>
        ) : (
          <>
            <LoginRegisterContentInput
              placeholder="OTP კოდი"
              type="text"
              value={otp}
              onChange={handleChange(setOtp)}
            />
            <LoginRegisterContentInput
              placeholder="ახალი პაროლი"
              type="password"
              value={newPassword}
              onChange={handleChange(setNewPassword)}
            />
            <LoginRegisterContentInput
              placeholder="გაიმეორეთ ახალი პაროლი"
              type="password"
              value={confirmPassword}
              onChange={handleChange(setConfirmPassword)}
            />
            <button
              disabled={loading}
              onClick={handleResetPassword}
              className="bg-[#FFD52A] py-4 w-full rounded-[40px] text-sm leading-5 text-[#0C0F21] font-helveticaneue-medium mt-6"
            >
              {loading ? "მიმდინარეობს..." : "პაროლის შეცვლა"}
            </button>
          </>
        )}
      </div>
      <hr className="hidden lg:block w-px h-full bg-[#E5E5E5]" />
      <SpinContent />
    </div>
  );
};

export default PasswordRecieve;
