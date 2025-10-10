"use client";

import { useState } from "react";
import { Star } from "react-coolicons";

export const TutorsStudentBox = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="bg-white p-5 rounded-2xl flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-[10px]">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 cursor-pointer ${
                rating >= star
                  ? "text-[#F04F14] fill-[#F04F14]"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <span className="text-sm leading-5 text-[#080808] font-helveticaneue-medium xl:text-base xl:leading-6">
          ნუგზარ ბიბილაშვილის შესახებ
        </span>
      </div>
      <span className="text-xs leading-4 text-black font-helveticaneue-regular text-start sm:text-sm sm:leading-5">
        საუკეთესო რეპეტიტორია, მისგან ძალიან ბევრი რამ ვისწავლე, არა მხოლოდ
        გაკვეთილებზე ზოგადად ცხოვრებაზეც კი. დიდი რეკომენდაცია ჩემგან
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-sm leading-5 text-black font-helveticaneue-medium">
          ბექა ბარბაქაძე
        </span>
        <span className="text-xs leading-4 text-[#767676] font-helveticaneue-regular">
          27 აგვისტო, 2025
        </span>
      </div>
    </div>
  );
};
