"use client";

import { useEffect, useState } from "react";
import { CircleWarning, Star } from "react-coolicons";
import toast from "react-hot-toast";

interface PropReview {
  isModal?: boolean;
  studentId: string; // აუცილებელი
}

interface TeacherProfileWithUser {
  id: string;
  userId: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
}

const Review = ({ isModal = false, studentId }: PropReview) => {
  const [rating, setRating] = useState(0);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [teachers, setTeachers] = useState<TeacherProfileWithUser[]>([]);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const res = await fetch("/api/teachers");
        const data = await res.json();
        setTeachers(data.teachers || []);
      } catch (err) {
        console.error("Teachers fetch error:", err);
        toast.error("მასწავლებლების ჩამოტვირთვა ვერ მოხერხდა");
      }
    }
    fetchTeachers();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const teacherSelect = document.getElementById(
        "teacher-select"
      ) as HTMLSelectElement;
      const teacherId = teacherSelect?.value;

      if (!teacherId) {
        toast.error("გთხოვთ, აირჩიოთ მასწავლებელი");
        setLoading(false);
        return;
      }

      if (rating === 0) {
        toast.error("გთხოვთ, აირჩიოთ ვარსკვლავის რაოდენობა");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          teacherId,
          rating,
          comment: value,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "შეცდომა მოხდა");
        setLoading(false);
        return;
      }

      setSuccess(true);
      toast.success("შეფასება წარმატებით დამატებულია!");
      setRating(0);
      setValue("");
    } catch (err) {
      console.error(err);
      toast.error("სერვერის შეცდომა");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl p-5 flex flex-col ${
        isModal ? "h-[570px] mt-0 lg:h-[592px]" : "lg:h-[680px] mt-4 lg:mt-0"
      }`}
      style={{ boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.05)" }}
    >
      <span className="font-helveticaneue-regular text-sm leading-5 text-[#737373]">
        შეფასების დაწერა
      </span>

      <div className="flex flex-col gap-3 justify-center items-center mt-5">
        <CircleWarning className="text-[#737373]" />
        <span className="text-xs leading-5 text-[#737373] font-helveticaneue-regular text-center sm:text-sm">
          შეფასების დაწერა შეგიძლიათ მხოლოდ თქვენს მიერ არჩეულ რეპეტიტორზე
        </span>
      </div>

      <hr className="text-[#EBECF0] mt-3 pb-4" />

      <section className="flex flex-col mt-3 border border-[#EBECF0] rounded-xl py-[10px] px-3">
        <span className="text-[10px] leading-4 text-[#737373] font-helveticaneue-regular sm:text-xs">
          აირჩეთ მასწავლებელი
        </span>
        <div className="relative w-full">
          <select
            id="teacher-select"
            className="w-full text-xs sm:text-sm leading-4 text-[#000000] font-helveticaneue-medium appearance-none focus:outline-none focus:ring-0"
          >
            {teachers.map((t) => (
              <option key={t.user.id} value={t.user.id}>
                {t.user.firstName} {t.user.lastName}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 -right-2 bottom-4 flex items-center pr-3">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between mt-3 py-[18px] px-3 border border-[#EBECF0] rounded-xl">
        <span className="text-[10px] sm:text-xs leading-4 text-[#737373] font-helveticaneue-regular">
          ვარსვკვლავი
        </span>
        <div className="flex items-center gap-[10px]">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer ${
                rating >= star
                  ? "text-[#F04F14] fill-[#F04F14]"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>

      <div className="relative w-full mt-3">
        <textarea
          id="review"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`w-full resize-none border border-[#EBECF0] rounded-xl focus:outline-none focus:ring-0 py-[10px] px-3 peer text-xs sm:text-sm leading-5 text-black font-helveticaneue-medium ${
            isModal ? "h-[162px]" : "h-[242px]"
          }`}
          placeholder=" "
        />
        {value === "" && (
          <label
            htmlFor="review"
            className="absolute left-3 top-3 text-[10px] sm:text-xs leading-4 text-[#737373] font-helveticaneue-regular pointer-events-none transition-all duration-200"
          >
            შეიყვანეთ კომენტარი
          </label>
        )}
      </div>

      <button
        className="text-sm leading-5 text-[#080808] font-helveticaneue-medium py-4 w-full rounded-[50px] bg-[#F0C514] mt-[30px] sm:mt-[26px] cursor-pointer"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "გადააგზავნა..." : "შეფასების დაწერა"}
      </button>

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      {success && (
        <p className="text-green-500 mt-2 text-sm">
          შეფასება წარმატებით დამატებულია!
        </p>
      )}
    </div>
  );
};

export default Review;
