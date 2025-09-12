import { TaskALt } from "./Icons";

export const SectionHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-2 lg:flex-row pb-6 2xl:pb-8">
      <p className="font-lgvanastasia-regular text-[#0C0F21] leading-10 text-[40px] lg:w-1/2 lg:text-[52px] xl:text-[40px] 2xl:text-[64px] 2xl:leading-[52px]">
        {title}
      </p>
      <p className="lg:pl-2 xl:pl-[18px] xl:pr-[70px] 2xl:pr-0 2xl:pl-[173px] 3xl:pl-[61px] text-[#737373] text-sm leading-5 font-helveticaneue-regular lg:w-1/2 lg:self-end 2xl:text-base 2xl:leading-6">
        {description}
      </p>
    </div>
  );
};

export const PackageText = ({ desc }: { desc: string }) => {
  return (
    <div className="flex gap-2">
      <div className="w-6 h-6">
        <TaskALt />
      </div>
      <div className="flex flex-col">
        <p className="text-[#737373] text-xs leading-4 font-helveticaneue-regular">
          შეთავაზება
        </p>
        <span className="text-[#0C0F21] text-sm leading-5 font-helveticaneue-regular">
          {desc}
        </span>
      </div>
    </div>
  );
};
