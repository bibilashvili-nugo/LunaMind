import Image from "next/image";

const Tutors = () => {
  return (
    <div>
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
      <div className="flex flex-col">
        <span className="font-spacegrotesk-bold text-[#0C0F21] text-2xl leading-6">
          137+
        </span>
        <span>რეპეტიტორი</span>
      </div>
    </div>
  );
};

export default Tutors;
