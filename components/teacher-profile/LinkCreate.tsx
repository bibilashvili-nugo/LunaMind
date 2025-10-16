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

  return (
    <div className="mt-6 w-full">
      <span className="font-helveticaneue-medium !font-bold px-4">
        შეხვედრის ლინკის დამატება
      </span>
      <hr className="mt-4 text-[#EBECF0]" />

      <div className="mt-4 px-4">
        <span className="text-sm text-[#737373] font-helveticaneue-regular">
          {lesson.subject} — {fullName}
        </span>
      </div>

      <div className="mt-4 px-4">
        <textarea
          placeholder="შეიყვანეთ შეხვედრის ლინკი"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full border border-[#F1F1F1] rounded-xl p-3 text-sm font-helveticaneue-medium text-[#080808] bg-white focus:outline-none resize-none h-24"
        />
      </div>

      <div className="px-4">
        <button
          onClick={handleSave}
          className="mt-5 w-full py-3 rounded-xl font-helveticaneue-medium text-white bg-[#F0C514] hover:bg-[#e6b800] transition"
        >
          შენახვა
        </button>
      </div>
    </div>
  );
};

export default LinkCreate;
