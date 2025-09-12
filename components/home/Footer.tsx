const Footer = () => {
  return (
    <div
      className="bg-[#080A16] rounded-tl-4xl rounded-tr-4xl mt-[55px] sm:mt-[44px] lg:mt-[64px] 3xl:mt-[84px]
    flex flex-col gap-[44px]"
    >
      <div className="pt-[44px] px-4 flex flex-col gap-3 lg:px-[44px] lg:pt-[64px]">
        <span className="text-white text-[40px] leading-[40px] font-lgvanastasia-regular text-center lg:text-[64px] lg:leading-[64px]">
          მზად ხარ დაიწყო განათლების ინოვაცია დღესვე ?
        </span>
        <p className="text-sm leading-5 font-helveticaneue-regular text-white/50 text-center lg:text-base lg:leading-6">
          შემოუერთდით ათასობით სტუდენტსა და რეპეტიტორს ჩვენს პლატფორმაზე
        </p>
      </div>
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
        <span className="text-white text-[36px] leading-[100%] font-lgvanastasia-regular underline lg:text-[44px]">
          გახდი მოსწავლე
        </span>
        <span className="text-white text-[36px] leading-[100%] font-lgvanastasia-regular underline lg:text-[44px]">
          გახდი რეპეტიტორი
        </span>
      </div>
      <div className="px-4 pb-[32px] lg:px-[44px] lg:mt-[20px]">
        <hr className="text-white/10 pb-6" />
        <div className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
          <span className="font-aclonica-regular text-white text-[32px] leading-[100%]">
            LunaMind
          </span>
          <span className="text-xs leading-4 text-[#939393] font-helveticaneue-regular sm:text-sm sm:leading-5">
            © 2025 ლუნამაინდი. ყველა უფლება დაცულია
          </span>
          <div className="flex flex-col gap-6 sm:flex-row">
            <span className="text-sm leading-5 underline text-white font-helveticaneue-regular">
              გამოყენების პოლიტიკა
            </span>
            <span className="text-sm leading-5 underline text-white font-helveticaneue-regular">
              წესები და პირობები
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
