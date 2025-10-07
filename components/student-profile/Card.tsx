import Image from "next/image";
import React from "react";
import { AddPlusCircle, CircleWarning, CreditCard01 } from "react-coolicons";

const CardBox = () => {
  return (
    <div className="flex justify-between p-4 border border-[#F1F1F1] rounded-xl items-center sm:w-1/2 xl:w-[343px]">
      <div className="flex gap-2">
        <CreditCard01 />
        <div className="flex flex-col gap-1">
          <span className="text-xs leading-4 text-[#737373] font-helveticaneue-medium">
            ბექა ბარბაქაძე
          </span>
          <span className="text-sm leading-5 text-[#080808]">
            4348 **** **** 8898
          </span>
        </div>
      </div>
      <div className="block">
        <Image src={"/images/Visa.png"} alt="visa" width={34} height={10} />
      </div>
    </div>
  );
};

const AddNewCard = () => {
  return (
    <div className="flex justify-center items-center gap-2 py-6 w-full border border-[#D9D9D9] border-dashed rounded-xl sm:w-1/2 xl:w-[343px]">
      <AddPlusCircle />
      <span className="text-xs leading-4 text-[#080808] font-helveticaneue-medium">
        ახალი ბარათის დამატება
      </span>
    </div>
  );
};

const Card = () => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <CardBox />
        <AddNewCard />
      </div>
      <div className="flex flex-col gap-3 items-center">
        <CircleWarning className="text-[#737373]" />
        <span className="text-sm leading-5 font-helveticaneue-regular text-[#737373] text-center">
          ლუნამაინდი თქვენს ბარათს არ იყენებს პირადი მოხმარებისთვის და მისი
          ხილვა ჩვენთვის შეუძლებელია. ბარათის მონაცემები გამოყენებული იქნება
          მხოლოდ თქვენი ინფორმაციისთვის რომ გადახდა ან თანხის ჩარიცხვა მოხდეს
          მარტივად და შეფერხების გარეშე
        </span>
      </div>
    </div>
  );
};

export default Card;
