import Image from "next/image";
import { SectionHeader } from "../ui/Text";
import { Star } from "../ui/Icons";

const StudentTestimonials = () => {
  return (
    <div className="pt-8 sm:pt-[44px] lg:pt-[64px] 3xl:pt-[84px]">
      <SectionHeader
        title="რას ამბობენ ჩვენი სტუდენტები"
        description="ჩვენ გვჯერა, რომ ტექნოლოგიებს შეუძლიათ სწავლის გამოცდილების შეცვლა"
      />
      <div className="flex flex-col gap-4 lg:gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
          <div
            className="inline-flex flex-col bg-[#52CE91] text-center px-[26px] py-[20px] 
            rounded-3xl gap-4 sm:items-center sm:gap-6 sm:p-[32px] lg:py-[32px] lg:px-[36px]
          lg:w-1/2"
          >
            <span
              className="font-lgvanastasia-regular text-[32px] leading-9 text-[#0C0F21] sm:w-[383px] 
            sm:text-[52px] sm:leading-[52px]"
            >
              გაიმყარე ცოდნა შეოუერთდი ჩვენს სტუდენტებს და დაიწყწე დღესვე
            </span>
            <div className="flex flex-col gap-3 items-center sm:flex-row">
              <button className="text-sm leading-5 font-helveticaneue-medium text-white bg-[#0C0F21] py-4 px-8 rounded-[40px]">
                გახდი მოსწავლე
              </button>
              <button className="text-sm leading-5 font-helveticaneue-medium text-[#0C0F21] bg-white py-4 px-8 rounded-[40px]">
                გახდი რეპეტიტორი
              </button>
            </div>
          </div>
          <div
            className="inline-flex flex-col bg-[#F6F7FB] text-center p-5 items-center rounded-3xl gap-4 sm:p-[22px]
          sm:flex-row sm:gap-8 lg:w-1/2"
          >
            <Image
              src={"/images/giorgi.png"}
              alt="picture"
              width={248}
              height={144}
              className="rounded-2xl"
            />
            <div className="flex flex-col gap-4 sm:justify-between sm:h-[252px] 2xl:py-[20px]">
              <span className="text-sm leading-5 text-[#0C0F21] text-start font-helveticaneue-regular xl:text-base xl:leading-6">
                “ ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია
                მკითხველის ყურადღება მიიზიდოს და დიზაინის აღქმაში ხელი შეუშალოს
                “
              </span>
              <span className="text-start text-[#0C0F21] text-[32px] leading-[32px] font-lgvanastasia-regular w-full">
                მაკა ნაჭყებია
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
          <div className="relative w-full h-[200px] sm:h-[296px] rounded-3xl overflow-hidden lg:w-1/2 xl:h-[384px]">
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
          <div className="flex flex-col gap-4 sm:flex-row lg:w-1/2 lg:gap-6">
            <div className="bg-[#7D3FFF] rounded-3xl p-6 sm:w-1/2 lg:h-[296px] xl:h-[384px]">
              <div className="bg-white inline-flex p-[10px] rounded-full justify-center items-center ">
                <Star />
              </div>
              <div className="pt-[27px] sm:pt-[71px] xl:pt-[160px]">
                <div className="flex items-end">
                  <div>
                    <span className="text-[54px] leading-[100%] font-spacegrotesk-bold text-white">
                      4.8
                    </span>
                  </div>
                  <div className="">
                    <span className="text-2xl leading-[100%] font-spacegrotesk-bold text-white/50">
                      /5.0
                    </span>
                  </div>
                </div>
                <span className="text-[32px] leading-8 text-white font-lgvanastasia-regular">
                  ჩვენი სასწავლო პროგრამის სარეიტინგო ქულა
                </span>
              </div>
            </div>
            <div className="bg-[#ECE3FF] rounded-3xl p-6 flex flex-col gap-[74px] sm:w-1/2 sm:h-[296px] sm:justify-between xl:h-[384px]">
              <span className="text-[#0C0F21] text-sm leading-5 font-helveticaneue-regular xl:text-base xl:leading-6">
                “ ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია
                მკითხველის ყურადღება მიიზიდოს და დიზაინის აღქმაში ხელი შეუშალოს
                “
              </span>
              <span className="text-[#0C0F21] text-[32px] leading-[32px] font-lgvanastasia-regular">
                ანა დაუშვილი
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTestimonials;
