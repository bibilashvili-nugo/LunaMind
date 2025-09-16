"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Show, Hide } from "react-coolicons";
import SpinContent from "../../../../components/ui/SpinContent";
import {
  LoginRegisterContentHeader,
  LoginRegisterContentSocial,
  LoginRegisterContentTitle,
} from "../../../../components/ui/LoginRegisterContent";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ აღარ გვჭირდება localStorage, middleware ინახავს cookie-ს
        router.replace("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("🔥 Client login error:", err);
      setError("სერვერის შეცდომა. სცადეთ მოგვიანებით.");
    }
  };

  return (
    <div className="h-screen flex px-4 sm:px-6 lg:px-[44px] w-full gap-6 2xl:px-[152px] 2xl:gap-[44px]">
      <div className="pt-8 flex flex-col mx-auto w-full lg:w-[65%] xl:w-1/2">
        {/* Header */}
        <LoginRegisterContentHeader />
        {/* Title */}
        <LoginRegisterContentTitle title="ავტორიზაცია" />

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col mt-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ელ.ფოსტა"
            className="w-full text-[#737373] p-4 border border-[#EBEBEB] rounded-[12px] focus:outline-none text-sm leading-5 font-helveticaneue-regular
          placeholder:font-helveticaneue-regular placeholder:text-[#737373] placeholder:text-sm placeholder:leading-5
          xl:text-base xl:leading-6"
            required
          />

          <div className="relative w-full mt-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="პაროლი"
              className="w-full text-[#737373] p-4 border border-[#EBEBEB] rounded-[12px] focus:outline-none text-sm leading-5 font-helveticaneue-regular
            placeholder:font-helveticaneue-regular placeholder:text-[#737373] placeholder:text-sm placeholder:leading-5
            xl:text-base xl:leading-6"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#737373]"
            >
              {showPassword ? <Hide /> : <Show />}
            </button>
          </div>

          <span
            className="text-end text-xs leading-4 text-[#0C0F21] font-helveticaneue-regular cursor-pointer hover:underline mt-3
          xl:text-sm xl:leading-5"
          >
            პაროლის აღდგენა
          </span>

          <button
            type="submit"
            className="w-full font-helveticaneue-medium text-sm text-[#0C0F21] py-4 bg-[#FFD52A] rounded-[40px] 
          cursor-pointer hover:bg-[#e6c21f] transition leading-5 mt-6 xl:text-base xl:leading-6"
          >
            შესვლა
          </button>
        </form>

        {/* Social login buttons */}
        <LoginRegisterContentSocial authType="რეგისტრაცია" />
      </div>
      <hr className="hidden lg:block w-px h-full bg-[#E5E5E5]" />
      <SpinContent />
    </div>
  );
};

export default LoginPage;
