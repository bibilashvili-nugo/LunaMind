import Packages from "../ui/Packages";

const OurPackages = ({ id }: { id: string }) => {
  return (
    <div
      className="pt-[32px] flex flex-col justify-center items-center sm:pt-[44px] lg:pt-[64px]"
      id={id}
    >
      <span className="text-[#0C0F21] text-[40px] leading-[40px] font-lgvanastasia-regular lg:text-[64px] lg:leading-[52px]">
        ჩვენი პაკეტები
      </span>
      <div className="pt-[32px] w-full flex flex-col gap-4 lg:flex-row lg:gap-6 2xl:w-full">
        <Packages
          color="bg-[#F6F7FB]"
          forWho="მოსწავლეებისთვის"
          buttonText="გახდი მოსწავლე"
          containerWidth="2xl:w-[40%]"
        />
        <Packages
          color="bg-[#E3EFFF]"
          forWho="რეპეტიტორებისთვის"
          buttonText="გახდი რეპეტიტორი"
          containerWidth="2xl:w-[60%]"
        />
      </div>
    </div>
  );
};

export default OurPackages;
