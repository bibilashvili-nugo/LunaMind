"use client";

import { useEffect, useState } from "react";

const FutureLessonsBoxTitle = ({ title }: { title: string }) => {
  return (
    <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular">
      {title}
    </span>
  );
};

const FutureLessonsBoxTime = ({ timeLine }: { timeLine: string }) => {
  return (
    <span className="text-sm leading-5 font-helveticaneue-regular text-[#080808]">
      {timeLine}
    </span>
  );
};

const FutureLessonsBoxContent = ({
  teacher = false,
}: {
  teacher?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:gap-0 sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-black"></div>
        <div className="flex flex-col">
          <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular">
            ნუგზარ ბიბილაშვილი
          </span>
          <span className="text-sm leading-5 text-[#080808] font-helveticaneue-medium !font-bold">
            ინგლისური ენა
          </span>
        </div>
      </div>
      {teacher ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
          <button className="text-sm leading-5 font-helveticaneue-regular py-3 rounded-[50px] bg-white text-[#080808] cursor-pointer sm:px-[34px] order-2 sm:order-1">
            შეხვედრის ლინკი
          </button>
          <button className="text-sm leading-5 font-helveticaneue-regular py-3 rounded-[50px] bg-[#F0C514] text-[#080808] cursor-pointer sm:px-[34px] order-1 sm:order-2">
            დასწრება
          </button>
        </div>
      ) : (
        <>
          <button className="text-sm leading-5 font-helveticaneue-regular py-3 rounded-[50px] bg-white cursor-pointer sm:px-[34px]">
            დასწრება
          </button>
        </>
      )}
    </div>
  );
};

const FutureLessonsBox = ({ teacher = false }: { teacher?: boolean }) => {
  return (
    <div className="flex flex-col bg-[#ECF1FF] rounded-2xl p-4 gap-3 ">
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
        <div className="flex flex-col sm:w-1/3">
          <FutureLessonsBoxTitle title="დაწყების თარიღი" />
          <FutureLessonsBoxTime timeLine="22 სექტემბერი, 19:00" />
        </div>
        <div className="flex flex-col sm:w-1/3">
          <FutureLessonsBoxTitle title="შეხვედრის დრო" />
          <FutureLessonsBoxTime timeLine="მხოლდო ოთხშაბათი" />
        </div>
        <div className="flex flex-col sm:w-1/3">
          <FutureLessonsBoxTitle title="ხანგრძლივობა" />
          <FutureLessonsBoxTime timeLine="2 საათი" />
        </div>
      </div>
      <FutureLessonsBoxContent teacher={teacher} />
    </div>
  );
};

const FutureLessons = ({ teacher = false }: { teacher?: boolean }) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formatted = new Intl.DateTimeFormat("ka-GE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(today);

    setFormattedDate(formatted);
  }, []);

  return (
    <div
      className="mt-4 bg-white rounded-2xl p-5 flex flex-col gap-4 max-h-[644px] overflow-y-auto lg:mt-0 xl:col-span-2 xl:max-h-[680px]"
      style={{ boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.05)" }}
    >
      <div className="flex flex-col gap-1">
        <span className="text-xl leading-7 text-[#0C0F21] font-helveticaneue-medium !font-bold">
          {formattedDate}
        </span>
        <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular">
          მოახლოებული გაკვეთილები (3)
        </span>
      </div>
      <hr className="text-[#EBECF0]" />
      <div className="flex flex-col gap-2">
        <FutureLessonsBox teacher={teacher} />
        <FutureLessonsBox teacher={teacher} />
        <FutureLessonsBox teacher={teacher} />
        <FutureLessonsBox teacher={teacher} />
        <FutureLessonsBox teacher={teacher} />
        <FutureLessonsBox teacher={teacher} />
      </div>
    </div>
  );
};

export default FutureLessons;
