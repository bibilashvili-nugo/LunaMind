"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { tutorSwiper } from "../../constants/data";
import Image from "next/image";
import { Star } from "react-coolicons";

const TutorSwipe = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          400: {
            slidesPerView: 1.5,
          },
          500: {
            slidesPerView: 1.8,
          },
          640: {
            slidesPerView: 2.4,
          },
          768: {
            slidesPerView: 2.8,
          },
          868: {
            slidesPerView: 3,
          },
          968: {
            slidesPerView: 3.2,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1124: {
            slidesPerView: 2.2,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 2.4,
            spaceBetween: 24,
          },
          1380: {
            slidesPerView: 2.6,
            spaceBetween: 24,
          },
          1480: {
            slidesPerView: 2.8,
            spaceBetween: 24,
          },
          1536: {
            slidesPerView: 2.9,
            spaceBetween: 24,
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
          <SwiperSlide key={index} className="bg-[#F6F7FB] rounded-3xl p-3">
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

      {/* Custom navigation buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <button className="custom-prev bg-gray-200 px-4 py-2 rounded-lg shadow">
          &lt;
        </button>
        <button className="custom-next bg-gray-200 px-4 py-2 rounded-lg shadow">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default TutorSwipe;
