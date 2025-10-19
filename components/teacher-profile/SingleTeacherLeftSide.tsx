import React from "react";
import { LinkHorizontal, Tag } from "react-coolicons";

const SingleTeacherLeftSide = () => {
  return (
    <div className="bg-white p-4 rounded-2xl lg:col-span-2">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-2xl leading-[100%] text-black font-helveticaneue-medium !font-bold lg:text-[32px]">
            ისტორიის საფუძვლები
          </span>
          <span className="text-sm leading-5 text-[#969696] font-helveticaneue-regular lg:text-base lg:leading-[100%]">
            ნუგზარ ბიბილაშვილი
          </span>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-0 sm:justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <LinkHorizontal color="#3E74FF" width={24} height={24} />
            <span className="text-[#3E74FF] text-sm leading-5 font-helveticaneue-regular underline">
              გაზიარება
            </span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Tag color="#969696" width={24} height={24} />
            <span className="text-[#969696] text-sm leading-5 font-helveticaneue-regular">
              ისტორიის გაკვეთილი
            </span>
          </div>
        </div>
      </div>
      <div className="bg-[#ECF1FF] rounded-xl p-3 mt-3 flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex flex-col gap-1 sm:w-1/2">
            <span className="text-xs leading-4 text-[#969696] font-helveticaneue-regular">
              მასწავლებელი
            </span>
            <span className="text-sm leading-5 text-[#080808] font-helveticaneue-medium !font-bold">
              ნუგზარ ბიბილაშვილი
            </span>
          </div>
          <div className="flex flex-col gap-1 sm:w-1/2">
            <span className="text-xs leading-4 text-[#969696] font-helveticaneue-regular">
              შეხვედრები
            </span>
            <span className="text-sm leading-5 text-[#080808] font-helveticaneue-medium !font-bold">
              ონლაინ კვირაში 3 დღე
            </span>
          </div>
        </div>
        <hr className="border border-[#D3DFFF]" />
        <div className="flex flex-col gap-1">
          <span className="text-xs leading-4 text-[#969696] font-helveticaneue-regular">
            საათები
          </span>
          <div className="flex flex-col sm:flex-row sm:gap-1">
            <span className="text-sm leading-5 font-helveticaneue-medium text-[#080808]">
              სამშაბათი: 19:00 - 21:00,
            </span>
            <span className="text-sm leading-5 font-helveticaneue-medium text-[#080808]">
              სამშაბათი: 19:00 - 21:00,
            </span>
            <span className="text-sm leading-5 font-helveticaneue-medium text-[#080808]">
              სამშაბათი: 19:00 - 21:00
            </span>
          </div>
        </div>
      </div>
      <div className="bg-black mt-3 w-full h-[185px] sm:h-[225px] relative">
        <span className="text-white absolute top-[50%] left-[10%]">
          ფოტო მასწის ან ისტორიის გაკვეთილის
        </span>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-base leading-6 text-[#000000] font-helveticaneue-medium !font-bold">
            გაკვეთილის აღწერა
          </span>
          <span className="text-sm leading-5 text-[#969696] font-helveticaneue-regular">
            SCRUM PRODUCT OWNERSHIP-ის კურსის მიზანია, დამწყებ სტუდენტებს
            გააცნოს Product Owner-ის როლი, SCRUM-ის მუშაობის პრინციპები და
            პროდუქტის განვითარებისა და მართვის პრაქტიკული ტექნიკები. კურსი
            ფოკუსირებულია გამოცდილებით სწავლაზე, რეალურ მაგალითებსა და
            ინტერაქტიულ სავარჯიშოებზე, რათა სტუდენტებმა მარტივად აითვისონ
            პროდუქტის მართვის საფუძვლები.
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-base leading-6 text-[#000000] font-helveticaneue-medium !font-bold">
            მასწავლებლის შესახებ
          </span>
          <span className="text-sm leading-5 text-[#969696] font-helveticaneue-regular">
            SCRUM PRODUCT OWNERSHIP-ის კურსის მიზანია, დამწყებ სტუდენტებს
            გააცნოს Product Owner-ის როლი, SCRUM-ის მუშაობის პრინციპები და
            პროდუქტის განვითარებისა და მართვის პრაქტიკული ტექნიკები. კურსი
            ფოკუსირებულია გამოცდილებით სწავლაზე, რეალურ მაგალითებსა და
            ინტერაქტიულ სავარჯიშოებზე, რათა სტუდენტებმა მარტივად აითვისონ
            პროდუქტის მართვის საფუძვლები.
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-base leading-6 text-[#000000] font-helveticaneue-medium !font-bold">
            სტუდენტის კარიერის პროგრამა
          </span>
          <span className="text-sm leading-5 text-[#969696] font-helveticaneue-regular">
            SCRUM PRODUCT OWNERSHIP-ის კურსის მიზანია, დამწყებ სტუდენტებს
            გააცნოს Product Owner-ის როლი, SCRUM-ის მუშაობის პრინციპები და
            პროდუქტის განვითარებისა და მართვის პრაქტიკული ტექნიკები. კურსი
            ფოკუსირებულია გამოცდილებით სწავლაზე, რეალურ მაგალითებსა და
            ინტერაქტიულ სავარჯიშოებზე, რათა სტუდენტებმა მარტივად აითვისონ
            პროდუქტის მართვის საფუძვლები.
          </span>
        </div>
      </div>
      <div className="flex flex-col mt-3 rounded-xl p-3 gap-1 bg-[#ECF1FF]">
        <span className="text-xs leading-4 text-[#969696] font-helveticaneue-regular">
          კონსულტაციისთვის დაგვიკავშირდი
        </span>
        <span className="text-sm leading-5 text-[#3E74FF] font-helveticaneue-medium !font-bold">
          +995 557 55 55 55 - 032 2 57 57 57 - info@domaincom
        </span>
      </div>
    </div>
  );
};

export default SingleTeacherLeftSide;
