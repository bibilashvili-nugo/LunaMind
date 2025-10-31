import Link from "next/link";
import { SectionHeader } from "../ui/Text";
import Image from "next/image";

const StudentBox = () => {
  return (
    <div className="bg-[#ECE3FF] rounded-3xl p-6 flex flex-col gap-[74px] sm:h-[296px] sm:justify-between xl:h-auto">
      <span className="text-[#0C0F21] text-sm leading-5 font-helveticaneue-regular xl:text-base xl:leading-6">
        “ ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია მკითხველის
        ყურადღება მიიზიდოს და დიზაინის აღქმაში ხელი შეუშალოს “
      </span>
      <span className="text-[#0C0F21] text-[32px] leading-[32px] font-lgvanastasia-regular">
        ანა დაუშვილი
      </span>
    </div>
  );
};

const StudentTestimonials = ({ id }: { id: string }) => {
  return (
    <div className="pt-8 sm:pt-[44px] lg:pt-[64px] 3xl:pt-[84px]" id={id}>
      <SectionHeader title="რას ამბობენ ჩვენი სტუდენტები" description="" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div
            className="inline-flex flex-col bg-[#52CE91] text-center px-[26px] py-[20px]
             rounded-3xl gap-4 sm:items-center sm:gap-6 sm:p-[32px] lg:py-[32px] lg:px-[36px]
           "
          >
            <span
              className="font-lgvanastasia-regular text-[32px] leading-9 text-[#0C0F21] sm:w-[383px]
             sm:text-[52px] sm:leading-[52px]"
            >
              გაიმყარე ცოდნა შეოუერთდი ჩვენს სტუდენტებს და დაიწყწე დღესვე
            </span>
            <div className="flex flex-col gap-3 items-center sm:flex-row">
              <Link
                href="/register?role=STUDENT"
                className="text-sm leading-5 font-helveticaneue-medium text-white bg-[#0C0F21] py-4 px-8 rounded-[40px]"
              >
                გახდი მოსწავლე
              </Link>
              <Link
                href="/register?role=TEACHER"
                className="text-sm leading-5 font-helveticaneue-medium text-[#0C0F21] bg-white py-4 px-8 rounded-[40px]"
              >
                გახდი რეპეტიტორი
              </Link>
            </div>
          </div>
          <div className="relative w-full h-[200px] sm:h-[296px] rounded-3xl overflow-hidden  xl:h-[384px]">
            <Image
              src={"/images/meeting.png"}
              alt="meeting"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#0C0F21]/50" />
            <div
              className="absolute inset-0 flex flex-col items-end justify-end text-right text-white p-4 sm:p-8 lg:p-6
             xl:py-8 2xl:px-[32px] 2xl:py-[44px] 3xl:px-[40px]"
            >
              <span className="text-[44px] leading-[100%] font-spacegrotesk-bold sm:text-[54px]">
                92%
              </span>
              <span className="text-[28px] leading-8 text-white font-lgvanastasia-regular sm:text-[32px]">
                კმაყოფილი შეფასება რეალური
              </span>
              <span className="text-[28px] leading-8 text-white font-lgvanastasia-regular sm:text-[32px]">
                სტუდენტებისგან
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
        </div>
      </div>
    </div>
  );
};

export default StudentTestimonials;
