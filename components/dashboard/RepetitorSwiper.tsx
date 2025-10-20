"use clinet";

import React, { useEffect, useState } from "react";
import { ChevronLeftMd, ChevronRightMd, Star } from "react-coolicons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// import { tutorSwiper } from "../../constants/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RepetitorSwiperLoading from "../loading/RepetitorSwiperLoading";

interface Teacher {
  id: string;
  user: {
    firstName: string;
    lastName: string;
    image?: string;
  };
  teacherSubjects: {
    name: string;
    price: number;
  }[];
  lessons: {
    day: string;
    time: string;
  }[];
  rating?: number;
}

const RepetitorSwiper = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("/api/teachers"); // 🔹 შეცვალე შენი API endpoint-ით
        const data = await response.json();
        setTeachers(data.teachers || []);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  console.log(teachers);

  if (loading) {
    return <RepetitorSwiperLoading />;
  }

  return (
    <div
      className="mt-4 bg-white rounded-2xl lg:mt-0"
      style={{ boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.05)" }}
    >
      {/* Header with title + custom nav buttons */}
      <div className="flex justify-between items-center mb-4 px-5 pt-5 gap-1.5">
        <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular">
          შემოთავაზებული რეპეტიტორები
        </span>
        <div className="flex gap-3">
          <button className="custom-prev p-[10px] bg-[#EBECF0] rounded-[40px] flex items-center justify-center">
            <ChevronLeftMd className="text-[#080808]" />
          </button>
          <button className="custom-next p-[10px] bg-[#EBECF0] rounded-[40px] flex items-center justify-center">
            <ChevronRightMd className="text-[#080808]" />
          </button>
        </div>
      </div>

      {/* Swiper */}
      <div className="w-full max-w-[1920px] 3xl:mx-auto overflow-hidden pb-5">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.2}
          slidesOffsetBefore={10}
          slidesOffsetAfter={10}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              slidesOffsetBefore: 10,
              slidesOffsetAfter: 10,
            },
            400: {
              slidesPerView: 1.2,
              slidesOffsetBefore: 10,
              slidesOffsetAfter: 10,
            },
            500: {
              slidesPerView: 1.5,
              slidesOffsetBefore: 10,
              slidesOffsetAfter: 10,
            },
            640: {
              slidesPerView: 2.1,
              slidesOffsetBefore: 16,
              slidesOffsetAfter: 16,
            },
            768: {
              slidesPerView: 2.4,
              slidesOffsetBefore: 16,
              slidesOffsetAfter: 16,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 24,
              slidesOffsetBefore: 44,
              slidesOffsetAfter: 44,
            },
            1124: {
              slidesPerView: 3.5,
              spaceBetween: 24,
              slidesOffsetBefore: 44,
              slidesOffsetAfter: 44,
            },
            1280: {
              slidesPerView: 2.8,
              spaceBetween: 24,
              slidesOffsetBefore: 44,
              slidesOffsetAfter: 44,
            },
            1380: {
              slidesPerView: 2.9,
              spaceBetween: 24,
              slidesOffsetBefore: 44,
              slidesOffsetAfter: 44,
            },
            1480: {
              slidesPerView: 3,
              spaceBetween: 24,
              slidesOffsetBefore: 44,
              slidesOffsetAfter: 44,
            },
            1536: {
              slidesPerView: 3.1,
              spaceBetween: 24,
              slidesOffsetBefore: 48,
              slidesOffsetAfter: 48,
            },
            1920: { slidesPerView: 3.2, spaceBetween: 24 },
          }}
        >
          {teachers?.map((teacher) => {
            const firstSubject = teacher.teacherSubjects[0];
            const price = firstSubject?.price || 0;
            const subjectName = firstSubject?.name || "საგანი";
            const fullName = `${teacher.user.firstName} ${teacher.user.lastName}`;
            const rating = teacher.rating || 4.9; // 🔹 დროებითი, შეცვალე რეალური რეიტინგით

            return (
              <SwiperSlide
                key={teacher.id}
                className="p-4 border border-[#EBECF0] rounded-[12px] w-full flex flex-col"
              >
                <div className="flex justify-between w-full items-center">
                  <div className="w-[44px] h-[44px] overflow-hidden">
                    <Image
                      src={teacher.user.image || "/images/default-profile.png"}
                      alt={fullName}
                      className="w-full h-full object-cover"
                      width={44}
                      height={44}
                    />
                  </div>
                  <div className="flex flex-col text-end gap-1">
                    <span className="text-sm leading-5 text-black font-helveticaneue-medium">
                      {price} ლარი
                    </span>
                    <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular">
                      {rating} შეფასება
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex flex-col gap-3">
                  <div className="flex flex-col">
                    <span className="text-[#737373] text-xs leading-4 font-helveticaneue-regular">
                      {subjectName}
                    </span>
                    <span className="text-sm leading-5 text-[#080808] font-helveticaneue-medium !font-bold">
                      {fullName}
                    </span>
                  </div>
                  <p className="text-[#737373] text-xs leading-4 font-helveticaneue-regular">
                    შედეგად, ტექსტი ჩვეულებრივ ინგლისურს გავს, მისი წაითხვა კი
                    შეუძლებელია. დღეს უამრავი პერსონალური საგამომცემლო
                  </p>
                </div>
                <hr className="text-[#EBECF0] mt-5 pb-3" />
                <div className="flex flex-col">
                  <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular">
                    შეხვედრის დრო
                  </span>
                  <span className="text-sm leading-5 text-[#080808] font-helveticaneue-medium">
                    {teacher.lessons.length > 0
                      ? "განსაზღვრული გრაფიკი"
                      : "თავისუფალი გრაფიკი"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 mt-3">
                  <button
                    className="text-sm leading-5 text-[#080808] font-helveticaneue-medium py-3 bg-[#F0C514] px-[71.5px] rounded-[50px] cursor-pointer w-full"
                    onClick={() =>
                      router.push(`/dashboard/tutors/${teacher.id}`)
                    }
                  >
                    არჩევა
                  </button>
                  <div className="shrink-0 bg-[#EBECF0] w-[44px] h-[44px] rounded-full flex items-center justify-center cursor-pointer">
                    <Star className="text-[#F04F14] fill-[#F04F14] w-[20px] h-[20px]" />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default RepetitorSwiper;
