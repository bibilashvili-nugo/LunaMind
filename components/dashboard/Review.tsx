import { useState } from "react";
import { CircleWarning, Star } from "react-coolicons";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [value, setValue] = useState("");
  return (
    <div
      className="mt-4 bg-white rounded-2xl p-5 flex flex-col"
      style={{ boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.05)" }}
    >
      <span className="text-[#737373] text-sm leading-5 font-helveticaneue-regular">
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
            className="w-full text-xs sm:text-sm leading-4 text-[#000000] font-helveticaneue-medium appearance-none
          focus:outline-none focus:ring-0"
          >
            <option value="ნუგზარ ბიბილაშვილი">ნუგზარ ბიბილაშვილი</option>
            <option value="ბექა ბარბაქაძე">ბექა ბარბაქაძე</option>
            <option value="ბორის ზურებიანი">ბორის ზურებიანი</option>
          </select>

          {/* Custom dropdown icon */}
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
                  : "text-gray-300 "
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
          className="w-full h-[242px] resize-none border border-[#EBECF0] rounded-xl 
                   focus:outline-none focus:ring-0 py-[10px] px-3 peer
                   text-xs sm:text-sm leading-5 text-black font-helveticaneue-medium"
          placeholder=" "
        />
        {value === "" && (
          <label
            htmlFor="review"
            className="absolute left-3 top-3 text-[10px] sm:text-xs leading-4 text-[#737373] 
                     font-helveticaneue-regular pointer-events-none transition-all duration-200"
          >
            შეიყვანეთ კომენტარი
          </label>
        )}
      </div>
      <button className="text-sm leading-5 text-[#080808] font-helveticaneue-medium py-4 w-full rounded-[50px] bg-[#F0C514] mt-[30px] sm:mt-[26px] cursor-pointer">
        შეფასების დაწერა
      </button>
    </div>
  );
};

export default Review;
