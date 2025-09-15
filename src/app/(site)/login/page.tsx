"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LanguageDropDown from "../../../../components/ui/LanguageDropDown";
import { Show, Hide } from "react-coolicons";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter(); // Router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    setError("");
    // ✅ აქ ხდება გადამისამართება წარმატების შემთხვევაში
    router.push("/dashboard"); // ან ნებისმიერი სხვა page
  };

  return (
    <>
      <div className="px-4 pt-8 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <span className="text-2xl leading-[100%] text-[#0C0F21] font-aclonica-regular">
            LunaMind
          </span>
          <LanguageDropDown />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[44px] leading-[100%] text-[#0C0F21] font-lgvanastasia-regular">
            ავტორიზაცია
          </span>
          <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular">
            შეიყვანეთ თქვენი მონაცემები
          </span>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ელ.ფოსტა"
            className="w-full text-[#737373] p-4 border border-[#EBEBEB] rounded-[12px] focus:outline-none"
            required
          />
          <div className="relative w-full mt-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="პაროლი"
              className="w-full text-[#737373] p-4 border border-[#EBEBEB] rounded-[12px] focus:outline-none"
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
          <span className="text-end text-xs leading-4 text-[#0C0F21] font-helveticaneue-regular mt-3">
            პაროლის აღდგება
          </span>
          <button
            type="submit"
            className="w-full font-helveticaneue-medium text-sm leading-5 text-[#0C0F21] py-4 bg-[#FFD52A] rounded-[40px] mt-6 cursor-pointer"
          >
            შესვლა
          </button>
        </form>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border border-[#EBEBEB] rounded-[12px] w-full justify-center py-[14px]">
            <div className="w-6 h-6 bg-[#D9D9D9]"></div>
            <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular">
              Google
            </span>
          </div>
          <div className="flex items-center gap-2 border border-[#EBEBEB] rounded-[12px] w-full justify-center py-[14px]">
            <div className="w-6 h-6 bg-[#D9D9D9]"></div>
            <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular">
              Facebook
            </span>
          </div>
        </div>
      </div>
      <div className="text-center text-xs leading-4 font-helveticaneue-regular pt-6">
        არ გაქვს ანგარიში?{" "}
        <Link href="/register" className="text-[#0077FF] hover:underline">
          რეგისტრაცია
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
