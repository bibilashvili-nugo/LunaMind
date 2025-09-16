"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LanguageDropDown from "../../../../components/ui/LanguageDropDown";
import { Show, Hide } from "react-coolicons";
import Link from "next/link";
import ContentWillBeAdd from "../../../../components/ui/ContentWillBeAdd";

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
        <div className="flex items-center justify-between 3xl:pr-[192px]">
          <span className="text-2xl text-[#0C0F21] font-aclonica-regular">
            LunaMind
          </span>
          <div className="lg:mr-4 2xl:mr-0">
            <LanguageDropDown />
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col items-center mt-8 lg:mt-[44px] lg:items-start 3xl:!mt-[64px]">
          <span className="text-[44px] text-[#0C0F21] font-lgvanastasia-regular leading-[100%]">
            ავტორიზაცია
          </span>
          <span className="text-sm text-[#737373] font-helveticaneue-regular leading-5 xl:text-base">
            შეიყვანეთ თქვენი მონაცემები
          </span>
        </div>

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
        <div className="flex flex-col mt-8 gap-4 lg:mt-6 xl:mt-[44px] 3xl:!mt-[64px]">
          <button className="flex items-center gap-2 border border-[#EBEBEB] rounded-[12px] w-full justify-center py-3 hover:bg-gray-100 transition">
            <div className="w-6 h-6 bg-[#D9D9D9] rounded-full"></div>
            <span className="text-sm text-[#737373] font-helveticaneue-regular leading-5 xl:text-base xl:leading-6">
              Google
            </span>
          </button>
          <button className="flex items-center gap-2 border border-[#EBEBEB] rounded-[12px] w-full justify-center py-3 hover:bg-gray-100 transition">
            <div className="w-6 h-6 bg-[#D9D9D9] rounded-full"></div>
            <span className="text-sm text-[#737373] font-helveticaneue-regular leading-5 xl:text-base xl:leading-6">
              Facebook
            </span>
          </button>
        </div>

        {/* Registration link */}
        <div className="text-center text-xs text-[#0C0F21] font-helveticaneue-regular leading-4 mt-6 xl:text-sm xl:leading-5">
          არ გაქვს ანგარიში?{" "}
          <Link
            href="/register"
            className="text-[#0077FF] hover:underline leading-4 text-xs xl:text-sm xl:leading-5"
          >
            რეგისტრაცია
          </Link>
        </div>
      </div>
      <hr className="hidden lg:block w-px h-full bg-[#E5E5E5]" />
      <div className="hidden lg:flex lg:w-[35%] h-screen overflow-hidden relative xl:w-1/2 xl:gap-6">
        <div className="marquee xl:w-1/2 lg:w-full">
          <div className="marquee-inner">
            {[...Array(10)].map((_, i) => (
              <ContentWillBeAdd key={i} />
            ))}
            {[...Array(10)].map((_, i) => (
              <ContentWillBeAdd key={`dup-left-${i}`} />
            ))}
          </div>
        </div>
        <div className="w-1/2 hidden xl:block xl:w-1/2">
          <div className="marquee-inner-scrollDown">
            {[...Array(10)].map((_, i) => (
              <ContentWillBeAdd key={i} />
            ))}
            {[...Array(10)].map((_, i) => (
              <ContentWillBeAdd key={`dup-left-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
