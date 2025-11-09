import React, { ReactNode } from "react";
import { Facebook, Instagram, TikTok, Youtube } from "../ui/Icons";

type SocialMediaIconsProps = {
  children: ReactNode;
};

const liClass = "text-sm leading-5 font-helveticaneue-regular text-[#939393]";
const spanClass =
  "font-helveticaneue-medium text-base leading-5 text-white !font-bold";

const SocialMediaIcons: React.FC<SocialMediaIconsProps> = ({ children }) => {
  return (
    <div className="border border-white/10 rounded-xl w-10 h-10 relative">
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="bg-[#080A16] w-full mt-8 md:mt-[44px] lg:mt-[52px] xl:mt-[64px] 2xl:mt-[54px] 3xl:mt-[64px] pb-20 lg:pb-10">
      <div className="pt-[64px] px-4 md:px-6 lg:px-[44px] flex flex-col gap-8 lg:flex-row lg:gap-8 2xl:px-[80px] 2xl:gap-0 2xl:justify-between 3xl:max-w-[1600px] 3xl:gap-16 3xl:mx-auto 3xl:px-[160px]">
        <div className="flex flex-col gap-2 2xl:w-[517px]">
          <span className="font-freeman-regular text-[#fff] text-[32px] leading-[100%]">
            EVECTUS
          </span>
          <span className="text-[#939393] text-sm leading-5">
            Evectus არის თანამედროვე საგანმანათლებლო პლატფორმა, რომელიც
            აერთიანებს მასწავლებლებსა და მოსწავლეებს ერთ კომფორტულ სივრცეში.
            ჩვენი მიზანია, ყველას მივცეთ შესაძლებლობა ისწავლოს მარტივად,
            თანამედროვე მეთოდებით და საკუთარი ტემპით – სადაც არ უნდა
            იმყოფებოდეს. <br />
            <br />
            Evectus-ზე თითოეული გაკვეთილი ტარდება ისე, რომ სწავლა იყოს არა
            მხოლოდ შედეგიანი, არამედ სასიამოვნო გამოცდილებაც. ჩვენ გვჯერა, რომ
            განათლება ყველასთვის ხელმისაწვდომი უნდა იყოს და სწორედ ამიტომ ვქმნით
            მომავალს, სადაც სწავლა არის თავისუფლება.
          </span>
        </div>
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-0 sm:justify-between lg:gap-8 2xl:gap-[64px]">
          <div className="flex flex-col gap-4">
            <span className={`${spanClass}`}>მომსახურება</span>
            <ul className="flex flex-col gap-3">
              <li className={`${liClass}`}>სტუდენტებისთვის</li>
              <li className={`${liClass}`}>დაწყებითი კლასებისთვის</li>
              <li className={`${liClass}`}>ლექტორებისთვის</li>
              <li className={`${liClass}`}>მასწავლებლებისთვის</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <span className={`${spanClass}`}>მხარდაჭერა</span>
            <ul className="flex flex-col gap-3">
              <li className={`${liClass}`}>კონფიდენციალურობა</li>
              <li className={`${liClass}`}>წესები და პირობები</li>
              <li className={`${liClass}`}>გამოყენების პოლიტიკა</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <span className={`${spanClass}`}>დახმარება</span>
            <ul className="flex flex-col gap-3">
              <li className={`${liClass}`}>(032) 2 57 56 45</li>
              <li className={`${liClass}`}>(+995) 555 75 85 84</li>
              <li className={`${liClass}`}>support@evectus.ge</li>
            </ul>
            <div className="flex gap-3">
              <SocialMediaIcons>
                <Facebook />
              </SocialMediaIcons>
              <SocialMediaIcons>
                <Instagram />
              </SocialMediaIcons>
              <SocialMediaIcons>
                <Youtube />
              </SocialMediaIcons>
              <SocialMediaIcons>
                <TikTok />
              </SocialMediaIcons>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-t border-white/10 mt-10" />
      <div
        className="mt-10 flex flex-col gap-5 
      px-4 md:px-6 lg:px-[44px] lg:flex-row lg:gap-0 lg:justify-between 2xl:px-[80px] 2xl:gap-0 2xl:justify-start 3xl:max-w-[1600px] 3xl:gap-16 3xl:mx-auto 3xl:px-[160px] 3xl:justify-between"
      >
        <span className="text-sm leading-5 text-[#939393] font-helveticaneue-regular 2xl:w-1/2 3xl:w-full">
          © 2025 ევექტუსი. ყველა უფლება დაცულია
        </span>
        <div className="flex flex-col gap-4 sm:flex-row lg:gap-6 2xl:w-1/2 3xl:w-full 3xl:justify-end">
          <span className="text-sm leading-5 text-white font-helveticaneue-regular underline">
            კონფიდენციალურობა
          </span>
          <span className="text-sm leading-5 text-white font-helveticaneue-regular underline">
            გამოყენების პოლიტიკა
          </span>
          <span className="text-sm leading-5 text-white font-helveticaneue-regular underline">
            წესები და პირობები
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
