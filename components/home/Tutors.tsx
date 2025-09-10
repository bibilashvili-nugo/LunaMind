import Image from "next/image";

const Tutors = () => {
  return (
    <div className="flex items-center justify-center gap-3 pt-6 pb-6">
      <div className="flex items-center">
        <div className="w-[52px] h-[52px] border-4 border-white rounded-full overflow-hidden">
          <Image alt="tutor" src="/images/tutor.png" width={52} height={52} />
        </div>
        <div className="-ml-6 w-[52px] h-[52px] border-4 border-white rounded-full overflow-hidden">
          <Image alt="tutor" src="/images/tutor.png" width={52} height={52} />
        </div>
        <div className="-ml-6 w-[52px] h-[52px] border-4 border-white rounded-full overflow-hidden">
          <Image alt="tutor" src="/images/tutor.png" width={52} height={52} />
        </div>
        <div className="-ml-6 w-[52px] h-[52px] border-4 border-white rounded-full overflow-hidden">
          <Image alt="tutor" src="/images/tutor.png" width={52} height={52} />
        </div>
        <div className="-ml-6 w-[52px] h-[52px] border-4 border-white rounded-full overflow-hidden">
          <Image alt="tutor" src="/images/tutor.png" width={52} height={52} />
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-spacegrotesk-bold text-[#0C0F21] text-2xl leading-6">
          137+
        </span>
        <span className="text-sm leading-4 text-[#939393] font-helveticaneue-regular">
          რეპეტიტორი
        </span>
      </div>
    </div>
  );
};

export default Tutors;
