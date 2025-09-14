"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { tutorSwiper } from "../../constants/data";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "react-coolicons";
import { SectionHeader } from "../ui/Text";

const TutorSwipe = ({ id }: { id: string }) => {
  return (
    <div
      className="pt-[32px] sm:pt-[44px] lg:pt-[52px] xl:pt-[64px] 3xl:pt-[84px]"
      id={id}
    >
      {/* Section Header */}
      <div className="px-4 sm:px-6 lg:px-11 3xl:px-[160px] max-w-[1920px] 3xl:mx-auto">
        <SectionHeader
          title="ჩვენი გამოცდილი რეპეტიტორები"
          description="ჩვენ გვჯერა, რომ ტექნოლოგიებს შეუძლიათ სწავლის გამოცდილების შეცვლა"
        />
      </div>

      {/* Swiper */}
      <div className="w-full max-w-[1920px] 3xl:mx-auto overflow-hidden">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.2} // small screens peek
          slidesOffsetBefore={10} // Apple-style left peek
          slidesOffsetAfter={10} // optional right margin
          breakpoints={{
            400: {
              slidesPerView: 1.5,
              slidesOffsetBefore: 10,
              slidesOffsetAfter: 10,
            },
            500: {
              slidesPerView: 1.8,
              slidesOffsetBefore: 10,
              slidesOffsetAfter: 10,
            },
            640: {
              slidesPerView: 2.4,
              slidesOffsetBefore: 16,
              slidesOffsetAfter: 16,
            },
            768: {
              slidesPerView: 2.8,
              slidesOffsetBefore: 16,
              slidesOffsetAfter: 16,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 24,
              slidesOffsetBefore: 44,
              slidesOffsetAfter: 44,
            },
            1124: {
              slidesPerView: 2.2,
              spaceBetween: 24,
              slidesOffsetBefore: 44,
              slidesOffsetAfter: 44,
            },
            1280: {
              slidesPerView: 2.4,
              spaceBetween: 24,
              slidesOffsetBefore: 44,
              slidesOffsetAfter: 44,
            },
            1380: {
              slidesPerView: 2.6,
              spaceBetween: 24,
              slidesOffsetBefore: 44,
              slidesOffsetAfter: 44,
            },
            1480: {
              slidesPerView: 2.8,
              spaceBetween: 24,
              slidesOffsetBefore: 44,
              slidesOffsetAfter: 44,
            },
            1536: {
              slidesPerView: 2.9,
              spaceBetween: 24,
              slidesOffsetBefore: 48,
              slidesOffsetAfter: 48,
            },
            1920: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
        >
          {tutorSwiper?.map((item, index) => (
            <SwiperSlide key={index} className="bg-[#F6F7FB]  rounded-3xl p-3">
              <div className="flex flex-col lg:flex-row items-center lg:gap-3">
                <Image
                  src={item?.img}
                  alt={item?.fullName}
                  width={234}
                  height={144}
                  className="mx-auto rounded-2xl w-full max-h-[144px] lg:h-[320px] lg:w-auto lg:object-cover"
                />
                <div className="flex flex-col mt-3 p-4 rounded-2xl bg-white lg:mt-0">
                  <p className="text-[#737373] text-xs leading-4 font-helveticaneue-regular pb-1 lg:text-sm lg:leading-5">
                    {item?.subject}
                  </p>
                  <span className="text-[#0C0F21] text-[28px] leading-[100%] font-lgvanastasia-regular pb-3 lg:text-[32px] lg:leading-5">
                    {item?.fullName}
                  </span>
                  <p className="text-[#737373] text-xs leading-4 font-helveticaneue-regular pb-3 lg:pb-5">
                    {item?.description}
                  </p>
                  <div className="flex gap-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[#0C0F21] text-2xl leading-6 font-spacegrotesk-bold">
                        {item?.price}
                      </span>
                      <p className="text-[#737373] text-xs leading-4 font-helveticaneue-regular">
                        ლარი საათში
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 pb-4 lg:pb-6">
                      <div className="flex gap-2">
                        <Star className="text-[#FF8C38] fill-[#FF8C38]" />
                        <span className="text-base leading-6 font-spacegrotesk-bold">
                          {item?.star}
                        </span>
                      </div>
                      <p className="text-[#737373] text-xs leading-4 font-helveticaneue-regular">
                        28 შეფასება
                      </p>
                    </div>
                  </div>
                  <button className="text-[#FFFFFF] text-sm leading-5 font-helveticaneue-medium py-3 w-full bg-[#0C0F21FA]/98 rounded-[40px]">
                    დეტალურად
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom navigation buttons */}
      <div className="w-full flex items-center justify-center pt-6 lg:pt-8 sm:justify-between px-4 sm:px-6 lg:px-11 3xl:px-[160px] max-w-[1920px] 3xl:mx-auto">
        <div className="hidden sm:flex gap-3">
          <button className="custom-prev p-[10px] bg-[#111425] rounded-[40px] flex items-center justify-center">
            <ChevronLeft className="text-white" />
          </button>
          <button className="custom-next p-[10px] bg-[#111425] rounded-[40px] flex items-center justify-center">
            <ChevronRight className="text-white" />
          </button>
        </div>
        <button className="bg-[#111425] text-white py-4 px-9 rounded-[40px] cursor-pointer text-sm leading-5 font-helveticaneue-medium">
          ყველას ნახვა
        </button>
      </div>
    </div>
  );
};

export default TutorSwipe;
