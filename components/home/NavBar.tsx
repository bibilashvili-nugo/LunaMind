"use client";

import { headerData } from "../../constants/data";
import { AccountCircle, ArrowDown, GeorgianFlag } from "../ui/Icons";

const NavBar = () => {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="flex items-center justify-between pt-6 lg:pb-[44px]">
      <div className="text-2xl leading-[100%] font-aclonica-regular xl:text-[32px]">
        LunaMind
      </div>
      <ul className="flex bg-[#F6F7FB] rounded-[50px] p-1">
        {headerData.map((item, index) => {
          // const isActive = pathname === item.href;
          return (
            <li
              key={index}
              className={`font-helveticaneue-regular text-sm leading-5 px-5 py-3 cursor-pointer rounded-[50px] 3xl:text-base 3xl:leading-6 `}
              // ${
              //   isActive
              //     ? "text-[#0C0F21] bg-white "
              //     : "text-[#737373] bg-[#F6F7FB]"
              // }
            >
              <a href={item.href} onClick={(e) => handleScroll(e, item.href)}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center gap-2 xl:gap-6">
        <div className="bg-[#FFD52A] py-[14px] px-[24px] rounded-[40px] xl:flex xl:items-center xl:gap-2">
          <AccountCircle />
          <span className="hidden xl:block xl:text-sm xl:leading-5 3xl:text-base 3xl:leading-[24px] font-helveticaneue-medium">
            შესვლა
          </span>
        </div>
        <div className="flex items-center py-[10px] pl-[10px] border border-[#EDEEF2] rounded-[40px]">
          <GeorgianFlag />
          <ArrowDown />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
