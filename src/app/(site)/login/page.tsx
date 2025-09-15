"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LanguageDropDown from "../../../../components/ui/LanguageDropDown";
import { Show, Hide } from "react-coolicons";
import Link from "next/link";

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

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        router.replace("/dashboard"); // ✅ replace
      } else {
        setError("Token not received from server");
      }
    } catch (err) {
      console.error("🔥 Client login error:", err);
      setError("სერვერის შეცდომა. სცადეთ მოგვიანებით.");
    }
  };

  return (
    <div className="px-4 pt-8 flex flex-col gap-8 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-2xl text-[#0C0F21] font-aclonica-regular">
          LunaMind
        </span>
        <LanguageDropDown />
      </div>

      {/* Title */}
      <div className="flex flex-col items-center">
        <span className="text-[44px] text-[#0C0F21] font-lgvanastasia-regular">
          ავტორიზაცია
        </span>
        <span className="text-sm text-[#737373] font-helveticaneue-regular">
          შეიყვანეთ თქვენი მონაცემები
        </span>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ელ.ფოსტა"
          className="w-full text-[#737373] p-4 border border-[#EBEBEB] rounded-[12px] focus:outline-none"
          required
        />

        <div className="relative w-full">
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

        <span className="text-end text-xs text-[#0C0F21] font-helveticaneue-regular mt-2 cursor-pointer hover:underline">
          პაროლის აღდგენა
        </span>

        <button
          type="submit"
          className="w-full font-helveticaneue-medium text-sm text-[#0C0F21] py-4 bg-[#FFD52A] rounded-[40px] mt-4 cursor-pointer hover:bg-[#e6c21f] transition"
        >
          შესვლა
        </button>
      </form>

      {/* Social login buttons */}
      <div className="flex flex-col gap-4 mt-4">
        <button className="flex items-center gap-2 border border-[#EBEBEB] rounded-[12px] w-full justify-center py-3 hover:bg-gray-100 transition">
          <div className="w-6 h-6 bg-[#D9D9D9] rounded-full"></div>
          <span className="text-sm text-[#737373] font-helveticaneue-regular">
            Google
          </span>
        </button>
        <button className="flex items-center gap-2 border border-[#EBEBEB] rounded-[12px] w-full justify-center py-3 hover:bg-gray-100 transition">
          <div className="w-6 h-6 bg-[#D9D9D9] rounded-full"></div>
          <span className="text-sm text-[#737373] font-helveticaneue-regular">
            Facebook
          </span>
        </button>
      </div>

      {/* Registration link */}
      <div className="text-center text-xs text-[#0C0F21] font-helveticaneue-regular mt-6">
        არ გაქვს ანგარიში?{" "}
        <Link href="/register" className="text-[#0077FF] hover:underline">
          რეგისტრაცია
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
