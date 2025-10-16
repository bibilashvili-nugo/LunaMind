"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface Lesson {
  id: string;
  subject: string;
  teacher: {
    firstName: string;
    lastName: string;
  };
}

interface LinkCreateProps {
  lesson: Lesson;
  onClose: () => void;
}

const LinkCreate: React.FC<LinkCreateProps> = ({ lesson, onClose }) => {
  const [link, setLink] = useState("");

  const handleSave = async () => {
    if (!link.trim()) {
      toast.error("გთხოვთ შეიყვანოთ შეხვედრის ლინკი");
      return;
    }

    try {
      const res = await fetch(`/api/teachers/saveLink`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: lesson.id, link }),
      });

      if (!res.ok) throw new Error("Failed to save link");

      toast.success("შეხვედრის ლინკი წარმატებით დაემატა!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("შეცდომა მოხდა ლინკის შენახვისას");
    }
  };

  const fullName = `${lesson.teacher.firstName} ${lesson.teacher.lastName}`;

  const isDisabled = !link.trim(); // Button disabled if input is empty

  return (
    <div className="mt-6 w-full">
      <span className="font-helveticaneue-medium !font-bold px-4 text-sm leading-5">
        შეხვედრის ლინკის დამატება
      </span>
      <hr className="mt-4 text-[#EBECF0]" />

      <div className="mt-4 px-4">
        <div className="border border-[#EBECF0] flex flex-col rounded-xl px-3 py-[10px]">
          <span className="text-sm text-[#737373] font-helveticaneue-regular ">
            {lesson.subject}
          </span>
          <span className="text-[#000000] text-sm leading-5 font-helveticaneue-medium">
            {fullName}
          </span>
        </div>
      </div>

      <div className="mt-4 px-4">
        <textarea
          placeholder="შეიყვანეთ შეხვედრის ლინკი"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full border border-[#F1F1F1] rounded-xl p-3 text-sm leading-5 font-helveticaneue-medium text-[#3E74FF] bg-white focus:outline-none resize-none h-24
          placeholder:text-sm placeholder:leading-4 placeholder:text-[#737373] placeholder:font-helveticaneue-regular"
        />
      </div>

      <div className="px-4">
        <button
          onClick={handleSave}
          disabled={isDisabled}
          className={`mt-5 w-full py-3 rounded-[50px] font-helveticaneue-medium text-[#080808] text-sm leading-5 transition ${
            isDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#F0C514] hover:bg-[#e6b800]"
          }`}
        >
          შენახვა
        </button>
      </div>
    </div>
  );
};

export default LinkCreate;
