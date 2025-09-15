"use client";

import React, { useState } from "react";

type Role = "STUDENT" | "TEACHER";

const RegistrationForm = () => {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<Role>("STUDENT");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    console.log("Registered user:", data.user);
    setError("");
    // Optionally redirect or clear form
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">რეგისტრაცია</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role */}
        <div>
          <label className="block mb-1 font-medium">როლი</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="STUDENT">მოსწავლე</option>
            <option value="TEACHER">მასწავლებელი</option>
          </select>
        </div>

        {/* Full Name */}
        <div>
          <label className="block mb-1 font-medium">სახელი და გვარი</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="მაგ: ნუგზარი ბიბილაშვილი"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">ელფოსტა</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium">ტელეფონის ნომერი</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium">პაროლი</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1 font-medium">გაიმეორე პაროლი</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Terms */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <label>ვეთანხმები წესებს და პირობებს</label>
        </div>

        {/* Privacy */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={acceptedPrivacy}
            onChange={(e) => setAcceptedPrivacy(e.target.checked)}
          />
          <label>ვეთანხმები კონფიდენციალურობის პოლიტიკას</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          რეგისტრაცია
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
