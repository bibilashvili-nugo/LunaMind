"use client";

import { useEffect, useState } from "react";
import { Star } from "react-coolicons";

interface ReviewType {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  teacher: { firstName: string; lastName: string };
  student: { firstName: string; lastName: string };
}

interface TutorsStudentBoxProps {
  studentId?: string;
  teacherId?: string;
}

export const TutorsStudentBox: React.FC<TutorsStudentBoxProps> = ({
  studentId,
  teacherId,
}) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const query = new URLSearchParams();
        if (studentId) query.append("studentId", studentId);
        if (teacherId) query.append("teacherId", teacherId);

        const res = await fetch(`/api/reviews?${query.toString()}`);
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    }
    fetchReviews();
  }, [studentId, teacherId]);

  if (reviews.length === 0) {
    return <p className="text-sm text-gray-500">შეფასებები არ არის</p>;
  }

  return (
    <>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white p-5 rounded-2xl flex flex-col gap-5"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-[10px]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    review.rating >= star
                      ? "text-[#F04F14] fill-[#F04F14]"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm leading-5 text-[#080808] font-helveticaneue-medium xl:text-base xl:leading-6">
              {review.teacher.firstName} {review.teacher.lastName} შესახებ
            </span>
          </div>
          <span className="text-xs leading-4 text-black font-helveticaneue-regular text-start sm:text-sm sm:leading-5">
            {review.comment}
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-sm leading-5 text-black font-helveticaneue-medium">
              {review.student.firstName} {review.student.lastName}
            </span>
            <span className="text-xs leading-4 text-[#767676] font-helveticaneue-regular">
              {new Date(review.createdAt).toLocaleDateString("ka-GE", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};
