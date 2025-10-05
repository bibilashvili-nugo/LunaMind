import { CalendarAdd, CaretCircleRight } from "react-coolicons";

interface OurLessonsProps {
  subject: string;
  teacher: string;
  svgColor: string;
}

const OurLessonsBox = ({ subject, teacher, svgColor }: OurLessonsProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border border-[#F1F1F1] rounded-2xl">
      <div className="flex items-center gap-3">
        <div>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="2" width="14" height="14" rx="7" fill="white" />
            <rect
              x="2"
              y="2"
              width="14"
              height="14"
              rx="7"
              stroke={svgColor}
              strokeWidth="4"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm leading-5 text-[#080808] font-helveticaneue-medium">
            {subject}
          </span>
          <span className="text-xs leading-4 text-[#737373] font-helveticaneue-regular">
            {teacher}
          </span>
        </div>
      </div>

      <CaretCircleRight className="text-[#737373]" />
    </div>
  );
};

const AddNewLessons = () => {
  return (
    <div className="flex items-center justify-center gap-2 px-2 py-4 bg-[#F6F5FA] rounded-[12px]">
      <CalendarAdd className="text-[#7D3FFF]" />
      <span className="text-sm leading-5 font-helveticaneue-regular text-[#080808] border-b-1 border-[#080808]">
        დაამატეთ ახალი გაკვეთილი
      </span>
    </div>
  );
};

const OurLessons = ({ profilePage = false }: { profilePage: boolean }) => {
  return (
    <div
      className={` bg-white rounded-2xl p-5 flex flex-col gap-4  lg:h-[596px] lg:py-6
        ${
          profilePage
            ? "md:h-[428px] overflow-scroll lg:mt-6 mt-4 lg:h-[436px]"
            : "mt-4 lg:mt-0"
        }`}
      style={{ boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.05)" }}
    >
      <span className="text-sm leading-5 text-[#737373] font-helveticaneue-regular">
        ჩემი გაკვეთილები
      </span>
      <div className="flex flex-col justify-between h-full gap-2">
        <div className="flex flex-col gap-2">
          <OurLessonsBox
            subject="ისტორიის საფუძვლები"
            teacher="მანანა კახიძე"
            svgColor="#7D3FFF"
          />
          <OurLessonsBox
            subject="მათემატიკა"
            teacher="გურამ ალთუნაშვილი"
            svgColor="#52CE91"
          />
          <OurLessonsBox
            subject="ზოგადი უნარები"
            teacher="მერაბ კაცაძე"
            svgColor="#F0C514"
          />
          <OurLessonsBox
            subject="ინგლისური ენა"
            teacher="თეიმურაზ ბოჭორიშვილი"
            svgColor="#3E74FF"
          />
          <OurLessonsBox
            subject="ბუნების მეტყველება"
            teacher="მერაბ კაცაძე"
            svgColor="#F04F14"
          />
        </div>
        <AddNewLessons />
      </div>
    </div>
  );
};

export default OurLessons;
